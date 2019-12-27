import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo/photo.entity';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'zpub',
      password: 'zpub',
      database: 'products',
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    PhotoModule,
  ],
})
export class AppModule {}
