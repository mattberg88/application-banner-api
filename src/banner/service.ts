import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, getConnection } from 'typeorm';
import { Banner } from './entity';
import { identifier } from '@babel/types';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
  ) {}

  async findCurrent(): Promise<Banner> {
    return await this.bannerRepository
    .createQueryBuilder()
    .where(
      '(dateshow <= :currentDate AND datehide> :currentDate)', { currentDate: new Date()},
    )
    .getOne();
  }

  async findByDate(date: Date): Promise<Banner> {
    return await this.bannerRepository
    .createQueryBuilder()
    .where(
      '(dateshow <= :date AND datehide> :date)', { date },
    )
    .getOne();

  }

  async findById(id: number): Promise<Banner> {
    return await this.bannerRepository
    .createQueryBuilder()
    .where('id = :id', { id })
    .getOne();

  }

  async create(createdBanner: Banner): Promise<Banner> {
    const created = await this.bannerRepository.save(createdBanner);
    return await this.findById(created.id);
  }
}
