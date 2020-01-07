import { Module } from '@nestjs/common';
import { BannerService } from './service';
import { BannerController } from './controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  providers: [BannerService],
  controllers: [BannerController],
})
export class BannerModule {}
