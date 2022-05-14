import { Route } from '@angular/router';
import { GestorVentasConsultasComponent } from './consultas/consultas.component';
import { GestorVentasPlanComponent } from './plan/plan.component';
import { GestorVentasSeguimientoComponent } from './seguimiento/seguimiento.component';
import { GestorVentasServiceComponent } from './service/service.component';

export const gestorVentasRoutingModule: Route[] = [
    {
        path : '',
        component : GestorVentasConsultasComponent
    },
    {
        path : 'consult',
        component : GestorVentasConsultasComponent
    },
    {
        path : 'status',
        component : GestorVentasSeguimientoComponent
    },
    {
        path : 'plan',
        component : GestorVentasPlanComponent
    },
    {
        path : 'service',
        component : GestorVentasServiceComponent
    }
];
