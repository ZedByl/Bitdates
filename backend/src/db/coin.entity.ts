import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('coins')
export class Coin {
  @PrimaryGeneratedColumn('uuid') // UUID for unique identifier
  id_local: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string; // Coin name

  @Column({ type: 'int', nullable: false })
  rank: number; // Coin rank

  @Column({ type: 'float', nullable: false })
  trending_index: number; // Trending index

  @Column({ type: 'int', nullable: false })
  upcoming: number; // Number of upcoming events

  @Column({ type: 'varchar', length: 10, nullable: false })
  symbol: string; // Symbol of the coin (e.g., BTC)

  @Column({ type: 'varchar', length: 150, nullable: false })
  fullname: string; // Full name of the coin
}
