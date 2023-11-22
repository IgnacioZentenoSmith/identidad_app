import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { Sector } from '../types'

@Entity()
@Unique(['rut'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  apellido: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  rut: string;

  @Column({ nullable: true })
  celular: string;

  @Column({ nullable: true })
  patente_particular_1: string;

  @Column({ nullable: true })
  patente_particular_2: string;

  @Column({
    type: 'enum',
    enum: Sector,
    nullable: true
  })
  sector_trabajo: Sector;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate: Date;
}