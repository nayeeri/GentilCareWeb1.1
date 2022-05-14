import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: 'home' },



    // Auth routes for guests
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) },
            { path: 'validate-pin', loadChildren: () => import('app/modules/auth/validate-pin/validate-pin.module').then(m => m.AuthValidatePinModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'material'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.PrincipalHomeModule) },
            { path: 'cadena-servicio', loadChildren: () => import('app/modules/landing/cadena-servicio/cadena-servicio.module').then(m => m.CadenaServicioModule) },
            { path: 'planes-atencion', loadChildren: () => import('app/modules/landing/planes/planes.module').then(m => m.PlanesAtencionModule) },
            { path: 'servicios', loadChildren: () => import('app/modules/landing/servicios/servicios.module').then(m => m.ServiciosModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'default'
        },
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [

            // Dashboards
            {
                path: 'dashboards', children: [
                    { path: 'principal', loadChildren: () => import('app/modules/admin/dashboards/principal/principal.module').then(m => m.PrincipalModule) },
                ]
            },

            // Pages
            {
                path: 'pages', children: [
                    {
                        path: 'direcciones', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/direcciones/direccion-list/direccion-list.module').then(m => m.AddressListModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/direcciones/direccion-form/direccion-form.module').then(m => m.AddressFormModule) }
                        ],
                    },
                    {
                        path: 'perfiles', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/perfiles/perfil-list/perfil-list.module').then(m => m.PerfilListModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/perfiles/perfil-form/perfil-form.module').then(m => m.PerfilFormModule) }
                        ],
                    },
                    {
                        path: 'historial-pagos', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/historial-pagos/historial-pago-list/historial-pago-list.module').then(m => m.HistorialPagoListModule) },
                        ],
                    },
                    {
                        path: 'agendas', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/agendas/agenda-list/agenda-list.module').then(m => m.AgendaListModule) },
                            { path: 'datos-consulta/:id', loadChildren: () => import('app/modules/admin/views/agendas/datos-consulta/datos-consulta-list.module').then(m => m.DatosConsultaListModule) },
                            { path: 'conferencia/:id', loadChildren: () => import('app/modules/admin/views/agendas/conferencias/conferencia-list.module').then(m => m.ConferenciaListModule) },
                        ],

                    },
                    {
                        path: 'gestor-ventas',
                        loadChildren: () => import('./modules/admin/views/gestor-ventas/gestor-ventas.module').then(m => m.GestorVentasModule)
                    },
                    {
                        path: 'plan',
                        loadChildren: () => import('./modules/admin/views/plan/plan.module').then(m => m.PlanModule)
                    },
                    {

                        path: 'usuarios', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/usuarios/usuario-list/usuario-list.module').then(m => m.UsuarioListModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/usuarios/usuario-form/usuario-form.module').then(m => m.UsuarioFormModule) },
                            { path: 'familiar', loadChildren: () => import('app/modules/admin/views/usuarios/usuario-familiar-list/usuario-familiar.module').then(m => m.UsuarioFamiliarModule) },
                            { path: 'familiar/:id', loadChildren: () => import('app/modules/admin/views/usuarios/usuario-familiar-form/usuario-familiar.module').then(m => m.UsuarioFamiliarModule) },
                            { path: 'servicio/:id', loadChildren: () => import('app/modules/admin/views/usuarios/usuario-servicio-form/usuario-servicio-form.module').then(m => m.UsuarioServicioFormModule)}
                        ],
                    },
                    {

                        path: 'estudios', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/estudios/estudio-lista/estudio-lista.module').then(m => m.EstudioListModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/estudios/estudio-form/estudio-form.module').then(m => m.EstudioFormModule) }
                        ],
                    },
                    {

                        path: 'especialidades', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/especialidades/especialidad-lista/especialidad-lista.module').then(m => m.EspecialidadListModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/especialidades/especialidad-form/especialidad-form.module').then(m => m.EspecialidadFormModule) }
                        ],
                    },
                    {

                        path: 'medicamentos', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/medicamentos/medicamento-lista/medicamento-lista.module').then(m => m.MedicamentoListModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/medicamentos/medicamento-form/medicamento-form.module').then(m => m.MedicamentoFormModule) }
                        ],
                    },
                    {

                        path: 'proveedores', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/proveedores/proveedor-lista/proveedor-lista.module').then(m => m.ProveedorListModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/proveedores/proveedor-form/proveedor-form.module').then(m => m.ProveedorFormModule) }
                        ],
                    },
                    {

                        path: 'servicios', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/servicios/servicio-lista/servicio-lista.module').then(m => m.ServicioListaModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/servicios/servicio-form/servicio-form.module').then(m => m.ServicioFormModule) }
                        ],
                    },
                    {

                        path: 'roles', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/roles/rol-list/rol-list.module').then(m => m.RolListModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/roles/rol-form/rol-form.module').then(m => m.RolFormModule) }
                        ],
                    },
                    {

                        path: 'planes', children: [
                            { path: 'lista', loadChildren: () => import('app/modules/admin/views/planes/plan-lista/plan-lista.module').then(m => m.PlanListaModule) },
                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/planes/plan-form/plan-form.module').then(m => m.PlanFormModule) }
                        ],
                    },
                    {

                        path: 'catalogo-estudios', children: [

                            { path: 'registro/:id', loadChildren: () => import('app/modules/admin/views/catalogo-estudios/catalogo-estudio-form/catalogo-estudio-form.module').then(m => m.CatalogoEstudioFormModule) }
                        ],
                    },


                    //Consulta Gestor Servicio
                    {
                        path: 'gs-consult',
                        loadChildren: () => import('./modules/admin/views/gestor-servicio-consultas/gestor-servicio-consultas.module').then(m => m.GestorServicioConsultasModule)
                    },
                    //Consulta
                    {
                        path: 'consult',
                        loadChildren: () => import('./modules/admin/views/consult/consult.module').then(m => m.ConsultModule)
                    },

                    //Citas
                    {
                        path: 'schedule',
                        loadChildren: () => import('./modules/admin/views/schedule/schedule.module').then(m => m.ScheduleModule)
                    },
                    // Error
                    {
                        path: 'error', children: [
                            { path: '404', loadChildren: () => import('app/modules/admin/views/error/error-404/error-404.module').then(m => m.Error404Module) },
                            { path: '500', loadChildren: () => import('app/modules/admin/views/error/error-500/error-500.module').then(m => m.Error500Module) }
                        ]
                    },


                ]
            },

            // 404 & Catch all
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/views/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];
