import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('QRcode')
@Controller('qrcode')
export class QrcodeController {
constructor(private readonly qrCodeService: QrcodeService) {}

@Get('')
  @ApiOperation({ summary: 'Generate QR Code' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'QR Code generated successfully',
  })
  async generateQRCode() {
    const { message, qrcode_uuid, qrCodeImage } = await this.qrCodeService.generateQRCode();

    const baseUrl = process.env.BASE_URL;
    const qrcodeUrl = `${baseUrl}/qrcode/${qrcode_uuid}`;

    return {
      message,
      qrcode_uuid,
      qrcode_url: qrcodeUrl,
      qrCodeImage,
    };
  }

  
@Get(':id')
@ApiOperation({ summary: 'Retrieve QR Code movies' })
@ApiResponse({
  status: HttpStatus.OK,
  description: 'QR Code and associated movies retrieved successfully',
})
async getQRCodeMovies(@Param('id') qrcode_uuid: string) {
  return await this.qrCodeService.getQRCodeMovies(qrcode_uuid);
}

}
