import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Encuesta } from './encuesta.entity';
import { Exclude } from 'class-transformer';
import { Opcion } from './opcion.entity';
import { TiposRespuestaEnum } from '../enums/tipos-respuesta.enum';

@Entity({ name: 'preguntas' })
export class Pregunta {
  @PrimaryGeneratedColumn({name: 'id_preguntas'})
  id: number;

  @Column()
  numero: number;

  @Column()
  texto: string;

  @Column({ type: 'enum', enum: TiposRespuestaEnum })
  tipo: TiposRespuestaEnum;

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas)
  @JoinColumn({ name: 'id_encuestas' })
  @Exclude()
  encuesta: Encuesta;

  @OneToMany(() => Opcion, (opcion) => opcion.pregunta, { cascade: ['insert'] })
  opciones: Opcion[];
}
