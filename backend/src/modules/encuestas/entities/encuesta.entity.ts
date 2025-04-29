import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pregunta } from './pregunta.entity';


@Entity({ name: 'encuestas' })
export class Encuesta {

  @PrimaryGeneratedColumn({ name: 'id_encuestas' })
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {
    cascade: ['insert'],
  })
  preguntas: Pregunta[];

  @Column({ name: 'codigo_respuestas' })
  codigoRespuesta: string;

  @Column({ name: 'codigo_resultados' })
  @Exclude()
  codigoResultados: string;
}
