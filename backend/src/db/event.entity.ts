import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  page_id: string;

  @OneToOne(() => User)
  @JoinTable({ name: 'id' })
  user_id?: string;

  @Column({ type: 'json', nullable: false })
  title: Record<string, string>; // Map-like structure

  @Column({ type: 'json', nullable: false })
  description: Record<string, string>; // Map-like structure

  @Column({ type: 'jsonb', nullable: false })
  categories: {
    id: number;
    name: string;
  }[]; // Array of category objects

  @Column({ type: 'timestamp', nullable: false })
  date_event: Date; // Event date

  @Column({ type: 'text', nullable: true })
  proof: string; // Optional proof field

  @Column({ type: 'text', nullable: true })
  image_url: string; // Optional image URL

  @Column({ type: 'jsonb', nullable: true })
  coins: {
    id: string;
    name: string;
    rank: number;
    trending_index: number;
    upcoming: number;
    symbol: string;
    fullname: string;
  }[]; // Relation to the Coin entity

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
