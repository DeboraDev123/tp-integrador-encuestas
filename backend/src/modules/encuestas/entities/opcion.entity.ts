import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Pregunta } from './pregunta.entity';
import { RespuestasOpciones } from './respuestas_opciones.entity';

@Entity({ name: 'opciones' })
export class Opcion {
  @PrimaryGeneratedColumn({name: 'id_opciones'})
  id: number;

  @Column()
  texto: string;

  @Column()
  numero: number;

  @ManyToOne(() => Pregunta, (pregunta) => pregunta.opciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_preguntas' })
  // @Exclude()
  pregunta: Pregunta;

  @OneToMany(() => RespuestasOpciones, (resOpciones) => resOpciones.opcion)
  respuestasOpciones: RespuestasOpciones[];
}
