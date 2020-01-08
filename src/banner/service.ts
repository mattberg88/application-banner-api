import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Banner } from './entity';

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
    return await this.bannerRepository.save(createdBanner);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.bannerRepository.delete(id);
  }

  async update(id: number, s: Banner): Promise<UpdateResult> {
    return await this.bannerRepository.update(id, s);
  }
}
