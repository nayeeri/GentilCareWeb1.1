import { Route } from '@angular/router';
import {  AgendaListComponent } from './agenda-list.component';




export const listAgendaRoutes: Route[] = [
    {
        path     : '',
        component: AgendaListComponent
    },
];
