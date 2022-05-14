import { Route } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { PrincipalResolver } from './principal.resolvers';


export const projectRoutes: Route[] = [
    {
        path     : '',
        component: PrincipalComponent,
        resolve  : {
            data: PrincipalResolver
        }
    }
];
