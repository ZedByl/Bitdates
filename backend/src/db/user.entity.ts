import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid') // UUID for unique identifier
  id: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string; // Unique email

  @Column({ type: 'varchar', nullable: false })
  password: string; // Encrypted password

  @Column({ type: 'simple-array', nullable: true })
  roles: string[]; // Array of roles (e.g., ["user", "admin"])

  @Column({ type: 'boolean', default: true })
  is_active: boolean; // Status of the user

  @CreateDateColumn()
  created_at: Date; // Automatically set creation date

  @UpdateDateColumn()
  updated_at: Date; // Automatically set update date

  @Column({ nullable: true })
  refreshToken?: string;
}
