import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid') // UUID for unique identifier
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string; // Unique email

  @CreateDateColumn()
  created_at: Date; // Automatically set creation date

  @UpdateDateColumn()
  updated_at: Date; // Automatically set update date
}
