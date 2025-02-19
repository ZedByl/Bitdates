import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  page_id: string;

  @Column({ type: 'bigint', unique: true, nullable: false })
  id: number;

  @Column({ type: 'text', nullable: true })
  user_id?: string;

  @Column({ type: 'json', nullable: false })
  title: Record<string, string>;

  @Column({ type: 'json', nullable: false })
  description: Record<string, string>;

  @Column({ type: 'jsonb', nullable: false })
  categories: {
    id: number;
    name: string;
  }[];

  @Column({ type: 'timestamp', nullable: false })
  date_event: Date;

  @Column({ type: 'text', nullable: true })
  event_link: string;

  @Column({ type: 'text', nullable: true })
  proof: string;

  @Column({ type: 'text', nullable: true })
  image_url: string;

  @Column({ type: 'jsonb', nullable: true })
  coins: {
    id: string;
    name: string;
    rank: number;
    trending_index: number;
    upcoming: number;
    symbol: string;
    fullname: string;
  }[];

  // Новые поля для категорий

  // Listing
  @Column({ type: 'text', nullable: true })
  exchange?: string;

  @Column({ type: 'text', nullable: true })
  trading_pair?: string;

  @Column({ type: 'timestamp', nullable: true })
  trading_start_time?: Date;

  // Airdrop
  @Column({ type: 'text', nullable: true })
  participation_requirements?: string;

  @Column({ type: 'bigint', nullable: true })
  token_amount?: number;

  @Column({ type: 'bigint', nullable: true })
  total_airdrop_pool?: number;

  @Column({ type: 'timestamp', nullable: true })
  distribution_date?: Date;

  @Column({ type: 'text', nullable: true })
  airdrop_link?: string;

  // Staking
  @Column({ type: 'bigint', nullable: true })
  minimum_staking_amount?: number;

  @Column({ type: 'decimal', nullable: true, precision: 5, scale: 2 })
  apy?: number;

  @Column({ type: 'text', nullable: true })
  lock_up_period?: string;

  @Column({ type: 'text', nullable: true })
  reward_type?: string;

  @Column({ type: 'text', nullable: true })
  withdrawal_conditions?: string;

  // Hard Fork
  @Column({ type: 'text', nullable: true })
  changes_updates?: string;

  @Column({ type: 'text', nullable: true })
  required_user_actions?: string;

  @Column({ type: 'text', nullable: true })
  networks_affected?: string;

  // Voting
  @Column({ type: 'text', nullable: true })
  voting_topic?: string;

  @Column({ type: 'text', nullable: true })
  staking_requirements?: string;

  @Column({ type: 'text', nullable: true })
  voting_period?: string;

  // Testnet/Mainnet/Nod
  @Column({ type: 'text', nullable: true })
  connection_guide?: string;

  @Column({ type: 'text', nullable: true })
  key_features?: string;

  @Column({ type: 'text', nullable: true })
  participation_rewards?: string;

  // Tokenomics
  @Column({ type: 'bigint', nullable: true })
  total_supply?: number;

  @Column({ type: 'bigint', nullable: true })
  circulating_supply?: number;

  @Column({ type: 'text', nullable: true })
  token_allocation?: string;

  @Column({ type: 'text', nullable: true })
  unlock_schedule?: string;

  @Column({ type: 'text', nullable: true })
  token_utility?: string;

  // Partnerships
  @Column({ type: 'text', nullable: true })
  parties_involved?: string;

  @Column({ type: 'text', nullable: true })
  goals?: string;

  @Column({ type: 'text', nullable: true })
  partnership_duration?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  generateIdIfMissing() {
    if (!this.id) {
      this.id = Math.floor(Math.random() * 1_000_000_000); // Генерация случайного числа
    }
  }
}
