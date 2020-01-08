import { Controller, HttpException, HttpStatus, Query, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';
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
    console.log(body);
    try {
    return await this.bannerService.create(body);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);

    }
  }

  @Put(':id')
  async updateBanner(
    @Param('id') id: number,
    @Body() body: Banner,
  ) {
    return await this.bannerService.update(id, body);
  }

  @Delete(':id')
  async deleteBanner(@Param('id') id: number) {
    return await this.bannerService.delete(id);
  }
}
