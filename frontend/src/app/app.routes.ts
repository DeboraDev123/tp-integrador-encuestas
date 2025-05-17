import { Routes } from '@angular/router';
import { CrearEncuestaComponent } from './components/crear-encuesta/crear-encuesta.component';

export const routes: Routes = [
    {
        path: 'crear-encuesta',
        component: CrearEncuestaComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
]