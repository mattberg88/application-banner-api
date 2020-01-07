import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerModule } from './banner/module';
import { Banner } from './banner/entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'zpub',
      password: 'zpub',
      database: 'products',
      entities: [Banner],
      synchronize: false,
    }),
    BannerModule,
  ],
})
export class AppModule {}
