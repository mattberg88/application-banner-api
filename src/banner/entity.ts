import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 't_banners',
  schema: 'public',
  database: 'products',
})
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bannerid: number;

  @Column()
  content: string;

  @Column()
  dateshow: string;

  @Column()
  datehide: string;

  @Column()
  showeverywhere: boolean;
}
