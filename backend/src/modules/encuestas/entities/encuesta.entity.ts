import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pregunta } from './pregunta.entity';
import { Respuesta } from './respuestas.entity';

@Entity({ name: 'encuestas' })
export class Encuesta {

  @PrimaryGeneratedColumn({ name: 'id_encuestas' })
  id: number;

  @Column()
  nombre: string;

  
  @Column({ name: 'codigo_respuestas' })
  codigoRespuesta: string;
  
  @Column({ name: 'codigo_resultados' })
  @Exclude()
  codigoResultados: string;
  
  
  @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta, {
    cascade: ['insert'],
  })
  preguntas: Pregunta[];
  
  
  @OneToMany(() => Respuesta, (respuesta) => respuesta.encuesta, {
    cascade: ['insert'],
  })
  respuestas: Respuesta[];

}
