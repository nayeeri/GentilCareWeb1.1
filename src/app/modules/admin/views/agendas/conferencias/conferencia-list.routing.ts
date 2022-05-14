import { Route } from '@angular/router';
import {   ConferenciaListComponent } from './conferencia-list.component';




export const listConferenciaRoutes: Route[] = [
    {
        path     : '',
        component: ConferenciaListComponent
    },
];
