import { Banner } from 'src/banner/banner.entity';

export default {
  type: 'postgres',
  entities: [Banner],
  synchronize: false,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: parseInt(process.env.PG_PORT, 10),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
};
