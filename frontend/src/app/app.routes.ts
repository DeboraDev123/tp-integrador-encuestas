import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';
import { EnlacesCompartirComponent } from './components/enlaces-compartir/enlaces-compartir.component';
import { ResponderEncuestaComponent } from './components/responder-encuesta/responder-encuesta.component';
import { VerResultadosComponent } from './components/ver-resultados/ver-resultados.component';
import { VerTodasComponent } from './components/ver-todas/ver-todas.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'crearPreguntas',
        component: CrearPreguntasComponent,
    },
    {
        path: 'verEncuestas',
        component: VerTodasComponent,
    },
    {
        path: 'enlaces',
        component: EnlacesCompartirComponent,
    },
    {
        path: 'responder/:id/:codigo/:tipo',
        component: ResponderEncuestaComponent,

    },
    {
        path: 'resultados/:id/:codigo/:tipo',
        component: VerResultadosComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
]