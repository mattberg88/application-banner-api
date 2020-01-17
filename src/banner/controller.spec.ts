import { BannerController } from './controller';
import { BannerService } from './service';
import { Repository } from 'typeorm';
import { Banner } from './entity';
import generateBanner from '../../test/generate.banner';
describe('BannerController', () => {
  let bannerController: BannerController;
  let bannerService: BannerService;
  beforeEach(() => {
    bannerService = new BannerService(
      new Repository<Banner>(),
    );
    bannerController = new BannerController(
      bannerService,
    );
  });

  describe('findCurrent', () => {
    it('find Banner with current date', async () => {
      const result: Banner = generateBanner();
      jest.spyOn(bannerService, 'findCurrent').mockImplementation(() => Promise.resolve(result));
      expect(await bannerController.findCurrent()).toBe(result);
    });
  });
  describe('findAll', () => {
    it('find Banner with current date', async () => {
      const bannerArray = [];
      for (let i = 0; i < 10; i += 1) {
        bannerArray.push(generateBanner());
      }
      jest.spyOn(bannerService, 'findAll').mockImplementation(() => Promise.resolve(bannerArray));
      expect(await bannerController.findAll()).toBe(bannerArray);

    });
  });
  describe('findByDate', () => {
    it('find Banner with current date', async () => {
      const result: Banner = generateBanner();
      const targetDate = result.startDate;
      const spy = jest.spyOn(bannerService, 'findByDate').mockImplementation(() => Promise.resolve(result));
      await bannerController.findByDate(targetDate.toString());
      expect(spy).toHaveBeenCalledWith(targetDate);
    });
  });
  describe('findById', () => {
    it('find Banner with current date', async () => {
      const result: Banner = generateBanner();
      const spy = jest.spyOn(bannerService, 'findById').mockImplementation(() => Promise.resolve(result));
      await bannerController.findById(123);
      expect(spy).toHaveBeenCalledWith(123);
    });
  });

  describe('createBanner', () => {
    it('find Banner with current date', async () => {
      const result: Banner = generateBanner();
      const spy = jest.spyOn(bannerService, 'create').mockImplementation(() => Promise.resolve(result));
      expect(await bannerController.createBanner(result)).toBe(result);
      expect(spy).toHaveBeenCalledWith(result);
    });
  });

  describe('updateBanner', () => {
    it('find Banner with current date', async () => {
      const result: Banner = generateBanner();
      const spy = jest.spyOn(bannerService, 'update').mockImplementation(() => new Promise(jest.fn()));
      await bannerController.updateBanner(123, result);
      expect(spy).toHaveBeenCalledWith(123, result);
  });
});

  describe('deleteBanner', () => {
    it('find Banner with current date', async () => {
      const result: Banner = generateBanner();
      const spy = jest.spyOn(bannerService, 'delete').mockImplementation(() => new Promise(jest.fn()));
      await bannerController.deleteBanner(1);
      expect(spy).toHaveBeenCalledWith(1);
    });
  });
});
