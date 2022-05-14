import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'perfil-list',
    templateUrl: './perfil-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PerfilListComponent implements AfterViewInit, OnInit {
    /**
     * Constructor
     */
    constructor(private router: Router)
    {
    }
    length = 0;
    pageSize = 5;
    currentPage = 0;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['correo', 'nombre', 'apellidoPaterno', 'telefono', 'editar'];
    displayedColumnsWeek: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes','sabado','domingo'];
    dataSource = [];
    dataSourceWeek = [];
    user: any
    role: string = '';

    ngOnInit() {
        this.length = this.dataSource.length;
        this.pageSize = 5;
        this.currentPage = 0;
        this.dataSource = [
            { id: 1, correo: 'test@correo.com', nombre: 'Nombre', apellidoPaterno: 'Apellido', telefono: '00-00-00-00' },
            { id: 2, correo: 'test@correo.com', nombre: 'Nombre', apellidoPaterno: 'Apellido', telefono: '00-00-00-00' },
            { id: 3, correo: 'test@correo.com', nombre: 'Nombre', apellidoPaterno: 'Apellido', telefono: '00-00-00-00'},



        ];
        this.dataSourceWeek = [
            { id: 1, lunes: '12:00 hrs', martes: '13:00 hrs', miercoles: '12:00 hrs', jueves: '12:30 hrs', viernes: '12:30 hrs', sabado: '12:30 hrs', domingo: '12:30 hrs'},
            { id: 2, lunes: '12:00 hrs', martes: '13:00 hrs', miercoles: '12:00 hrs', jueves: '12:30 hrs', viernes: '12:30 hrs', sabado: '12:30 hrs', domingo: '12:30 hrs'},


        ];
        this.length = this.dataSource.length;

        this.user = JSON.parse(localStorage.getItem('usuario'));
        this.role = this.user.role.role;

    }

    ngAfterViewInit() {




    }

    irDetalle(id:number){
        this.router.navigate(['/pages/perfiles/registro/' + id]);
    }
}
