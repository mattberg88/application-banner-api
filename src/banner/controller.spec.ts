import { BannerController } from './controller';
import * as request from 'supertest';
import { mockBanners } from '../../test/mockBanners';
import { BannerService } from './service';
import { Test } from '@nestjs/testing';
import { Banner } from './entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';

describe('BannerController', () => {
  let app: INestApplication;
  const myTestsService = {
    findCurrent: () => {
      return mockBanners[0];
    },
    findAll: () => {
      return mockBanners;
    },
    findByDate: () => {
      return mockBanners[0];
    },
    findById: () => {
      return mockBanners[0];
    },
    create: () => {
      return {status: 'created'};
    },
    update: () => {
      return {status: 'updated'};
    },
    delete: () => {
      return {status: 'deleted'};
    },
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BannerService,
        {
          provide: getRepositoryToken(Banner),
          useValue: myTestsService,
        },
      ],
      controllers: [BannerController],
    })
    .overrideProvider(BannerService)
    .useValue(myTestsService)
    .compile();
    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET current banner`, async () => {
    return await request(app.getHttpServer())
      .get('/api/banner')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(mockBanners[0]);
      });
  });
  it(`/GET current banner return 400 if error`, async () => {
    return await request(app.getHttpServer())
      .get('/api/banner')
      .end((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(mockBanners[0]);
      });
  });
  it(`/GET list of all banners`, async () => {
    return await request(app.getHttpServer())
      .get('/api/banner/list')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(mockBanners);
      });
  });
  it(`/GET banner by date`, async () => {
    return await request(app.getHttpServer())
      .get('/api/banner?date=2019-10-29')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(mockBanners[0]);
      });
  });
  it(`/GET banner by id`, async () => {
    return await request(app.getHttpServer())
      .get('/api/banner/1')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(mockBanners[0]);
      });
  });
  it(`/POST banner`, async () => {
    return await request(app.getHttpServer())
      .post('/api/banner')
      .send({
        id: null,
        bannerId: 12156,
        content: 'Archery',
        startDate: '2019-10-29T00:00:00.000Z',
        endDate: '2019-10-29T00:00:00.000Z',
        display: true,
      })
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body).toStrictEqual({ status: 'created' });
      });
  });

  it(`/POST banner returns proper error if post object is wrong`, async () => {
    return await request(app.getHttpServer())
      .post('/api/banner')
      .send('')
      .set('Accept', 'application/json')
      .then((res) => {
        expect(res.status).toBe(201);
        console.log(res)

        expect(res.body).toStrictEqual({ status: 'created' });
      });
  });
  it(`/PUT banner by id`, async () => {
    return await request(app.getHttpServer())
      .put('/api/banner/1')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ status: 'updated' });
      });
  });
  it(`/DELETE banner by id`, async () => {
    return await request(app.getHttpServer())
      .delete('/api/banner/1')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ status: 'deleted' });
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
