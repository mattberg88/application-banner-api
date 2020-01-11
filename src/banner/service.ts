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
      '(startDate <= :currentDate AND endDate> :currentDate)', { currentDate: new Date()},
    )
    .getOne();
  }

  async findAll(): Promise<Banner[]> {
    return await this.bannerRepository
    .createQueryBuilder()
    .getMany();
  }

  async findByDate(date: Date): Promise<Banner> {
    return await this.bannerRepository
    .createQueryBuilder()
    .where(
      '(startDate <= :date AND endDate> :date)', { date },
    )
    .getOne();

  }

  async findById(id: number): Promise<Banner> {
    return await this.bannerRepository
    .createQueryBuilder()
    .where('bannerid = :id', { id })
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
