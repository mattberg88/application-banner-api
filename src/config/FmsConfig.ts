import {
  HttpModuleOptions,
  HttpModuleOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService, InjectConfig } from 'nestjs-config';

@Injectable()
export class FmsConfig
  implements HttpModuleOptionsFactory, TypeOrmOptionsFactory {
  constructor(@InjectConfig() private readonly config: ConfigService) {
    this.config = config;
  }
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 60000,
    };
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get('pg.host'),
      database: this.config.get('pg.database'),
      port: parseInt(this.config.get('pg.port'), 10),
      username: this.config.get('pg.username'),
      password: this.config.get('pg.password'),
      entities: [process.env.ENTITIES],
    };
  }
}
