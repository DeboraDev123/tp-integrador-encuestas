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
import { RespuestasAbiertas } from './respuestas_abiertas.entity';

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

  @ManyToOne(() => Encuesta, (encuesta) => encuesta.preguntas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_encuestas' })
  @Exclude()
  encuesta: Encuesta;

  @OneToMany(() => Opcion, (opcion) => opcion.pregunta,{
    onDelete: 'CASCADE',
  })
  opciones: Opcion[];

  @OneToMany(() => RespuestasAbiertas, (resAbierta) => resAbierta.pregunta)
  respuestasAbiertas: RespuestasAbiertas[];
}
