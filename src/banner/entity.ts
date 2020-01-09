import {
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import {
  IsNotEmpty,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@Entity({
  name: 't_banners',
  schema: 'public',
  database: 'products',
})
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'bannerid',
  })
  @Min(1)
  @IsNotEmpty()
  bannerId: number;

  @Column({
    name: 'content',
  })
  @MinLength(1)
  @MaxLength(2000)
  @IsNotEmpty()
  content: string;

  @Column({
    name: 'display',
  })
  display: boolean;
  @Column({
    name: 'startdate',
  })
  startDate: Date;

  @Column({
    name: 'enddate',
  })
  endDate: Date;


}