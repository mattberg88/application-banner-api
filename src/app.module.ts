import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule } from 'nestjs-config';
import { BannerModule } from './banner/banner.module';
import { FmsConfig } from './config/FmsConfig';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      path: path.resolve(
        __dirname,
        `../env/${process.env.NODE_ENV || 'development'}.env`,
      ),
    }),
    BannerModule,
    TypeOrmModule.forRootAsync({
      useClass: FmsConfig,
    }),
  ],
})
export class AppModule {configure(consumer: MiddlewareConsumer) {
  consumer.apply().forRoutes(
    {
      path: '/api/banner',
      method: RequestMethod.ALL,
    },
  );
}
}
