import { BannerService } from './service';
import { Banner } from './entity';
import { mockBanners } from '../../test/mockBanners';
import { TestingModule, Test } from '@nestjs/testing';
describe('BannerService', () => {
  let testingModule: TestingModule;
  let service: BannerService;
  let spyBannerService: BannerService;

  beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        providers: [
          BannerService,
          {
            provide: BannerService,
            useFactory: () => ({
              findCurrent: jest.fn(() => mockBanners[0]),
              findAll: jest.fn(() => mockBanners),
              findByDate: jest.fn((date: Date) => mockBanners[0]),
              findById: jest.fn((id: number) => mockBanners[0]),
              create: jest.fn((banner: Banner) => true),
              delete: jest.fn((id: number) => true),
              update: jest.fn((id: number, banner: Banner) => true),

            }),
          },
        ],
      }).compile();

      service = testingModule.get(BannerService);
      spyBannerService = testingModule.get(BannerService);
    });

  it('should invoke findCurrent from BannerService', async () => {
    await service.findCurrent();
    expect(spyBannerService.findCurrent).toHaveBeenCalled();
  });

  it('should invoke findAll from BannerService', async () => {
    await service.findAll();
    expect(spyBannerService.findAll).toHaveBeenCalled();
  });

  it('should invoke findByDate from BannerService', async () => {
    const requestDate = new Date('2019-10-29');
    await service.findByDate(requestDate);
    expect(spyBannerService.findByDate).toHaveBeenCalledWith(requestDate);
  });

  it('should invoke findById from BannerService', async () => {
    await service.findById(1);
    expect(spyBannerService.findById).toHaveBeenCalledWith(1);
  });

  it('should invoke create from BannerService', async () => {
    const createdBanner: Banner = {
      id: null,
      bannerId: 12156,
      content: 'Archery',
      startDate: new Date('2019-10-29T00:00:00.000Z'),
      endDate: new Date('2019-10-29T00:00:00.000Z'),
      display: true,
    };
    await service.create(createdBanner);
    expect(spyBannerService.create).toHaveBeenCalledWith(createdBanner);
  });

  it('should invoke delete from BannerService', async () => {
    await service.delete(1);
    expect(spyBannerService.delete).toHaveBeenCalledWith(1);
  });

  it('should invoke update from BannerService', async () => {
    const updateBanner = {
      id: 1,
      bannerId: 12156,
      content: 'Archery',
      startDate: new Date('2019-10-29T00:00:00.000Z'),
      endDate: new Date('2019-10-29T00:00:00.000Z'),
      display: true,
    };
    const requestDate = new Date('2019-10-29');
    await service.update(1, updateBanner);
    expect(spyBannerService.update).toHaveBeenCalledWith(1, updateBanner);
  });
});
