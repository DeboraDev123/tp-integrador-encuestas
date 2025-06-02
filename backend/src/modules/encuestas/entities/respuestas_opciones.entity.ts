import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Respuesta } from './respuestas.entity';
import { Exclude } from 'class-transformer';
import { Opcion } from './opcion.entity';

@Entity({ name: 'respuestas_opciones' })
export class RespuestasOpciones {
  @PrimaryGeneratedColumn({ name: 'id_respuestas_opciones' })
  id: number;

  @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasOpciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_respuestas' })
  @Exclude()
  respuesta: Respuesta;

  @ManyToOne(() => Opcion, (opcion) => opcion.respuestasOpciones)
  @JoinColumn({ name: 'id_opciones' })
  @Exclude()
  opcion: Opcion;
}
