import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';



@Component({
    selector: 'agenda-list',
    templateUrl: './agenda-list.component.html',
    styleUrls: ['./agenda-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AgendaListComponent implements OnInit {


    /**
     * Constructor
     */
    constructor(private router: Router, private _fuseConfirmationService: FuseConfirmationService) {
    }
    length = 0;
    pageSize = 5;
    currentPage = 0;
    direccion_id: number = 0;
    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['ticket', 'nombre', 'fecha', 'hora', 'datos', 'video', 'anteriores'];
    dataSource = [];

    ngOnInit() {
        this.length = this.dataSource.length;
        this.pageSize = 5;
        this.currentPage = 0;
        this.dataSource = [
            { id: 1, nombre: 'Nombre', ticket: '004545', fecha: '04/Mayo/2022', hora: '12:00', },
            { id: 2, nombre: 'Nombre', ticket: '004242', fecha: '04/Mayo/2022', hora: '12:00', },


        ];
        this.length = this.dataSource.length;

    }

    ngAfterViewInit() {

    }
    mostrarDatos(id: number) {
        this.router.navigate(['/pages/agendas/datos-consulta/' + id]);
    }

    irVideo(id: number) {
        this.router.navigate(['/pages/agendas/conferencia/' + id]);
    }
}
