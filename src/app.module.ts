import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { QrcodeModule } from './qrcode/qrcode.module';

@Module({
  imports: [MovieModule, QrcodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
