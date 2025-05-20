import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';
import { EnlacesCompartirComponent } from './components/enlaces-compartir/enlaces-compartir.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'crearEncuestas',
        component: CrearPreguntasComponent,
    },
    {
        path: 'enlaces',
        component: EnlacesCompartirComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }


]