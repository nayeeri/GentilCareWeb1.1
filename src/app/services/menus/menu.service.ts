import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { MenuInterface } from 'app/interfaces/menu.interface';

@Injectable()
export class MenuService {


   /****
     ID	Rol
    1	Administrador
    2	Ventas
    3	Salud
    4	Servicio
    5	Colaborador
    6	Usuario
    7	Socio

    */

    private menuItems: MenuInterface[] = [
        //Administrador
        { rolId: 1, rolName: 'Administrador', name: 'usuarios', alias: 'Ver Usuarios', menuUrl: 'pages/usuarios/lista', sort: 1, active: true },
        { rolId: 1, rolName: 'Administrador', name: 'planes', alias: 'Ver Planes', menuUrl: 'pages/planes/lista', sort: 2, active: true },
        { rolId: 1, rolName: 'Administrador', name: 'roles', alias: 'Ver Roles', menuUrl: 'pages/roles/lista', sort: 3, active: true },
        { rolId: 1, rolName: 'Administrador', name: 'servicios', alias: 'Ver Servicios', menuUrl: '/pages/servicios/lista', sort: 4, active: true },
        { rolId: 1, rolName: 'Administrador', name: 'catalogo-estudios', alias: 'Catálogo Estudios', menuUrl: 'pages/catalogo-estudios/registro/0', sort: 5, active: true },
        { rolId: 1, rolName: 'Administrador', name: 'nuev-estudio', alias: 'Crear Estudio', menuUrl: 'pages/estudios/lista', sort: 7, active: true },
        { rolId: 1, rolName: 'Administrador', name: 'nueva-especialidad', alias: 'Crear Especialidad', menuUrl: 'pages/especialidades/lista', sort: 8, active: true },
        { rolId: 1, rolName: 'Administrador', name: 'medicamentos', alias: 'Medicamentos', menuUrl: 'pages/medicamentos/lista', sort:9, active: true },
        { rolId: 1, rolName: 'Administrador', name: 'proveedores', alias: 'Proveedores', menuUrl: 'pages/proveedores/lista', sort:10, active: true },
       // { rolId: 1, rolName: 'Administrador', name: 'usuario-nuevo', alias: 'Crear Nueva Cuenta', menuUrl: '/pages/user/new', sort: 8, active: true },

        //Ventas
        { rolId: 2, rolName: 'Ventas', name: 'planes', alias: 'Ver Planes', menuUrl: '/pages/plan', sort: 1, active: true },
        { rolId: 2, rolName: 'Ventas', name: 'seguimiento', alias: 'Seguimiento de Servicios', menuUrl: '/pages/gestor-ventas/status', sort: 2, active: true },
        { rolId: 2, rolName: 'Ventas', name: 'servicios', alias: 'Ver Servicios', menuUrl: '/pages/servicios/lista', sort: 3, active: true },
        { rolId: 2, rolName: 'Ventas', name: 'consultas', alias: 'Consultas', menuUrl: '/pages/gestor-ventas/consult', sort: 1, active: true },

        //Salud
        { rolId: 3, rolName: 'Salud', name: 'colaboradores', alias: 'Colaboradores', menuUrl: '#', sort: 1, active: true },

        //Servicio
        { rolId: 4, rolName: 'Servicio', name: 'planes', alias: 'Ver Planes', menuUrl: '/pages/plan', sort: 1, active: true },
        { rolId: 4, rolName: 'Servicio', name: 'servicios', alias: 'Ver Servicios', menuUrl: '/pages/servicios/lista', sort: 2, active: true },
        { rolId: 4, rolName: 'Servicio', name: 'consultas', alias: 'Consultas Asignadas', menuUrl: 'pages/consult', sort: 3, active: true },
        { rolId: 4, rolName: 'Servicio', name: 'usuarios', alias: 'Registro de Usuarios', menuUrl: '/pages/user/0', sort: 4, active: true },
        { rolId: 4, rolName: 'Servicio', name: 'consultas', alias: 'Consultas', menuUrl: '#', sort: 5, active: true },
        { rolId: 4, rolName: 'Servicio', name: 'reagenda', alias: 'Reagenda Citas', menuUrl: '/pages/schedule', sort: 6, active: true },

        //Colaborador

        { rolId: 5, rolName: 'Colaborador', name: 'direccion', alias: 'Ver Direcciones', menuUrl: '/pages/direcciones/lista', sort: 2, active: true },
        { rolId: 5, rolName: 'Colaborador', name: 'perfil', alias: 'Perfiles', menuUrl: '/pages/perfiles/lista', sort: 3, active: true },
        { rolId: 5, rolName: 'Colaborador', name: 'pagos', alias: 'Historial de Pagos', menuUrl: '/pages/historial-pagos/lista', sort: 4, active: true },
        { rolId: 5, rolName: 'Colaborador', name: 'agenda', alias: 'Agenda', menuUrl: '/pages/agendas/lista', sort: 5, active: true },

          //Usuario
        { rolId: 6, rolName: 'Usuario', name: 'plan', alias: 'Plan o Servicio', menuUrl: '/pages/usuarios/servicio/0', sort: 1, active: true },
        { rolId: 6, rolName: 'Usuario', name: 'direccion', alias: 'Ver Direcciones', menuUrl: '/pages/direcciones/lista', sort: 2, active: true },
        { rolId: 6, rolName: 'Usuario', name: 'mi-plan', alias: 'Ver mi Plan', menuUrl: '/pages/plan', sort: 3, active: true },
        { rolId: 6, rolName: 'Usuario', name: 'Perfil', alias: 'Perfiles', menuUrl: '/pages/perfiles/lista', sort: 4, active: true },
        { rolId: 6, rolName: 'Usuario', name: 'nuevo-familiar', alias: 'Agregar Familiar', menuUrl: '/pages/usuarios/familiar/0', sort: 5, active: true },
        { rolId: 6, rolName: 'Usuario', name: 'ver-familiar', alias: 'Ver Familiar', menuUrl: '/pages/usuarios/familiar', sort: 6, active: true },
        { rolId: 6, rolName: 'Usuario', name: 'consultas', alias: 'Consultas', menuUrl: '/pages/consult', sort:7, active: true },

        //Socio
        { rolId: 7, rolName: 'Socio', name: 'plan', alias: 'Plan o Servicio', menuUrl: '#', sort: 1, active: true },
        { rolId: 7, rolName: 'Socio', name: 'direccion', alias: 'Ver Direcciones', menuUrl: '/pages/direcciones/lista', sort: 2, active: true },
        { rolId: 7, rolName: 'Socio', name: 'mi-plan', alias: 'Ver mi Plan', menuUrl: '/pages/plan', sort: 3, active: true },
        { rolId: 7, rolName: 'Socio', name: 'perfil', alias: 'Perfiles', menuUrl: '/pages/perfiles/lista', sort: 4, active: true },
        { rolId: 7, rolName: 'Socio', name: 'nuevo-familiar', alias: 'Agregar Familiar', menuUrl: '#', sort: 5, active: true },
        { rolId: 7, rolName: 'Socio', name: 'ver-familiar', alias: 'Ver Familiar', menuUrl: '#', sort: 6, active: true },
        { rolId: 7, rolName: 'Socio', name: 'consultas', alias: 'Consultas', menuUrl: '#', sort: 7, active: true },
    ];



    private menuBS = new BehaviorSubject<MenuInterface[]>([]);

    /**
     * Constructori
     */
    constructor(
        private _httpClient: HttpClient,
        private router: Router
    ) {
    }
    get menu(): Observable<MenuInterface[]> {

       let menuUser = [];
        if (this.UserRolId > 0) {
            menuUser = this.menuItems.filter(option => option.rolId == this.UserRolId);
            if (menuUser.length) {
                this.menuBS.next(menuUser);
            }
        }
        this.menuBS.next(menuUser);

        return this.menuBS.asObservable();
    }


    get UserSession(): any {
        return localStorage.getItem('usuario') ?? null;
    }

    get UserRolId(): any {

        if (this.UserSession !== undefined && this.UserSession !== null) {
            let data = JSON.parse(this.UserSession);
            return data['role'] ? data['role']['rolesId']: 0;
        }
        return 0;
    }



    /*get menus(): MenuInterface[] {
        this.menuUser = [];
        if (this.UserRolName > 0) {
            this.menuUser = this.menuItems.filter(option => option.rolName == this.UserRolName);
            if (this.menuUser.length) {
                return this.menuUser.sort(function (a, b) {
                    return a.sort - b.sort;
                });
            }
        }
        return this.menuUser;
    }*/


}
