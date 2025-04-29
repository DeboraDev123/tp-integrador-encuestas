import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Pregunta } from './pregunta.entity';

@Entity({ name: 'opciones' })
export class Opcion {
  @PrimaryGeneratedColumn({name: 'id_opciones'})
  id: number;

  @Column()
  texto: string;

  @Column()
  numero: number;

  @ManyToOne(() => Pregunta)
  @JoinColumn({ name: 'id_preguntas' })
  @Exclude()
  pregunta: Pregunta;
}
