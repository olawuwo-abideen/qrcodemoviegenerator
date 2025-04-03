import { Module } from '@nestjs/common';
import { QrcodeController } from './qrcode.controller';
import { QrcodeService } from './qrcode.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [QrcodeController],
  providers: [QrcodeService, DatabaseService]
})
export class QrcodeModule {}
