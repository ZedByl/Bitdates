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
  page_id: string; // Автоматически генерируемый UUID

  @Column({ type: 'bigint', unique: true, nullable: false })
  id: number; // Числовой ID, получаемый из API

  @Column({ type: 'text', nullable: true })
  user_id?: string;

  @Column({ type: 'json', nullable: false })
  title: Record<string, string>; // Структура данных для заголовка

  @Column({ type: 'json', nullable: false })
  description: Record<string, string>; // Структура данных для описания

  @Column({ type: 'jsonb', nullable: false })
  categories: {
    id: number;
    name: string;
  }[]; // Массив объектов категорий

  @Column({ type: 'timestamp', nullable: false })
  date_event: Date; // Дата события

  @Column({ type: 'text', nullable: true })
  proof: string; // Дополнительное поле для доказательства

  @Column({ type: 'text', nullable: true })
  image_url: string; // Дополнительное поле для URL изображения

  @Column({ type: 'jsonb', nullable: true })
  coins: {
    id: string;
    name: string;
    rank: number;
    trending_index: number;
    upcoming: number;
    symbol: string;
    fullname: string;
  }[]; // Связь с монетами

  @CreateDateColumn()
  created_at: Date; // Дата создания записи

  @UpdateDateColumn()
  updated_at: Date; // Дата обновления записи

  // Хук для генерации ID, если он не предоставлен
  @BeforeInsert()
  generateIdIfMissing() {
    if (!this.id) {
      this.id = Math.floor(Math.random() * 1_000_000_000); // Генерация случайного числа
    }
  }
}
