import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class QrcodeService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  private qrLink: string;
  private intervalId: NodeJS.Timeout | null = null;

  async onModuleInit() {
    await this.generateQRCode();
    this.startInterval();
  }

  async getQrCode(): Promise<string> {
    if (!this.qrLink) {
      throw new Error('QR code not generated yet.');
    }
    return await QRCode.toDataURL(this.qrLink);
  }

  private async startInterval() {
    if (!this.intervalId) {
      this.intervalId = setInterval(async () => {
        try {
          const hasMovies = await this.hasMovies();
          if (!hasMovies) {
            this.stopInterval();
            throw new Error('No movies found! QR code generation has been stopped.');
          }
          await this.generateQRCode();
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }, 10000);
    }
  }

  private stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private async hasMovies(): Promise<boolean> {
    const movieCount = await this.databaseService.movie.count();
    return movieCount > 0;
  }

  async generateQRCode(): Promise<any> {
    const randomMovies = await this.getRandomMovies();
    if (randomMovies.length === 0) {
      throw new Error('No movies found! QR code generation stopped.');
    }
  
    const qrCodeId = uuidv4();
    const qrCodeUrl = `${process.env.BASE_URL}/qrcode/${qrCodeId}`;
    this.qrLink = qrCodeUrl; 
  
    const qrCodeImage = await QRCode.toDataURL(qrCodeUrl);

    // console.log(`Generated QR Code Link: ${qrCodeUrl}`);
    
    await this.databaseService.qRCode.create({
      data: {
        id: qrCodeId,
        qrCodeImage,
        movies: randomMovies,
      },
    });
  
    return {
      message: 'QR code generated successfully!',
      qrcode_uuid: qrCodeId,
      qrcode_url: qrCodeUrl,
      qrCodeImage,
    };
  }

  async getQRCodeMovies(qrcode_uuid: string): Promise<any> {
    const qrCodeRecord = await this.databaseService.qRCode.findUnique({
      where: { id: qrcode_uuid },
    });

    if (!qrCodeRecord) {
      throw new NotFoundException('Invalid QR code.');
    }

    return {
      qrcode_uuid: qrCodeRecord.id,
      movies: qrCodeRecord.movies,
    };
  }

  private async getRandomMovies(): Promise<{ title: string; image: string }[]> {
    const movies = await this.databaseService.movie.findMany({
      select: {
        title: true,
        image: true,
      },
    }) as { title: string; image: string }[];
    
    if (movies.length === 0) {
      throw new Error('No movies found in the database!');
    }
    
    return this.shuffleArray(movies).slice(0, 10);
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}