import { Employee } from '../employee/Entity/employee.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export default class Cafe {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 300 })
  public description: string;

  @Column({ type: 'varchar', length: 300 })
  public logo: string;

  @Column({ type: 'varchar', length: 300 })
  public location!: string;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @OneToMany(() => Employee, (employee) => employee.cafe)
  employees: Employee[];
}
