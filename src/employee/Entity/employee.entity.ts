import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 300 })
  public email_address: string;

  @Column({ type: 'varchar', length: 300 })
  public phone_number: string;

  @Column({ type: 'varchar', length: 300 })
  public gender!: string;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
