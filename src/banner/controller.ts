import { Controller, Query, Param, Get, Post, Body } from '@nestjs/common';
import { BannerService } from './service';
import { Banner } from './entity';

@Controller('api/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get('')
  async findCurrent(): Promise<Banner> {
    return this.bannerService.findCurrent();
  }

  @Get('date')
  async findBydate(@Query('date') date: string,
  ): Promise<Banner> {
    return this.bannerService.findByDate(new Date(date));
  }

  @Get(':id')
  async findById(@Param('id') id: number,
  ): Promise<Banner> {
    return this.bannerService.findById(id);
  }

  @Post('')
  async createBanner(@Body() body: Banner) {
    console.log(body)
    return await this.bannerService.create( { ...body } );
  }
}
