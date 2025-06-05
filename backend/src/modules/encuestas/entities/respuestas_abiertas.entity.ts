import { Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn ,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Respuesta } from './respuestas.entity';
import { Pregunta } from "./pregunta.entity";

@Entity({ name: "respuestas_abiertas" })
export class RespuestasAbiertas {
    @PrimaryGeneratedColumn({ name: 'id_respuestas_abiertas' })
    id: number;

    @Column()
    texto: string;    


    @ManyToOne(() => Respuesta, (respuesta) => respuesta.respuestasAbiertas)
    @JoinColumn({ name: "id_respuestas" })
    // @Exclude()
    respuesta: Respuesta;

    @ManyToOne(() => Pregunta, (pregunta) => pregunta.respuestasAbiertas)
    @JoinColumn({ name: "id_pregunta" })
    // @Exclude()
    pregunta: Pregunta;
}