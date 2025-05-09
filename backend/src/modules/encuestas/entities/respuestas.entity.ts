import { 
    Entity,
    OneToMany,
    JoinColumn,
    ManyToOne,
  PrimaryGeneratedColumn,
}   from 'typeorm';
import { Exclude } from 'class-transformer';
import { Encuesta } from './encuesta.entity';
import { RespuestasAbiertas } from './respuestas_abiertas.entity';
import { RespuestasOpciones } from './respuestas_opciones.entity';

@Entity({ name: 'respuestas' })
export class Respuesta {
    @PrimaryGeneratedColumn({ name: 'id_respuestas' })
    id: number;

    @ManyToOne(() => Encuesta, (encuesta) => encuesta.respuestas)
    @JoinColumn({ name: 'id_encuestas' })
    @Exclude()
    encuesta: Encuesta;

    @OneToMany(() => RespuestasAbiertas, (resAbierta) => resAbierta.respuesta)
    respuestasAbiertas: RespuestasAbiertas[];

    @OneToMany(() => RespuestasOpciones, (resOpciones) => resOpciones.respuesta)
    respuestasOpciones: RespuestasOpciones[];
}
