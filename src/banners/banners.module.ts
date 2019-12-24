import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { BannersController } from './banners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannersEntity } from './banners.entity';
import { FollowsEntity } from '../profile/follows.entity';
import { BannersService } from './banners.service';
import { AuthMiddleware } from '../user/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([BannersEntity, FollowsEntity])],
  providers: [BannersService],
  controllers: [
    BannersController
  ]
})
export class BannersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'banners', method: RequestMethod.GET});
  }
}
