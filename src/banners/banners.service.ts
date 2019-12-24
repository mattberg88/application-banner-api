import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BannersEntity } from './banners.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(BannersEntity)
    private readonly tagRepository: Repository<BannersEntity>
  ) {}

  async findAll() {
    return 'hello'
  }
  // async findAll(): Promise<BannersEntity[]> {
  //   return await this.tagRepository.find();
  // }
}
