import { Module, MiddlewareConsumer, RequestMethod, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import { ConfigModule, ConfigService } from 'nestjs-config';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}'), {
      path: path.resolve(
        __dirname,
        `../env/${process.env.NODE_ENV || 'development'}.env`,
      ),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('pg'),
            inject: [ConfigService],
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
