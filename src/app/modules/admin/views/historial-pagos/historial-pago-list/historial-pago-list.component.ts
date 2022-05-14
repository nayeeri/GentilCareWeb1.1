import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';



@Component({
    selector: 'historial-pago-list',
    templateUrl: './historial-pago-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HistorialPagoListComponent implements OnInit {


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
    displayedColumns: string[] = ['noConsultas', 'ticket', 'fecha', 'hora', 'estatus'];
    dataSource = [];

    ngOnInit() {
        this.length = this.dataSource.length;
        this.pageSize = 5;
        this.currentPage = 0;
        this.dataSource = [
            { id: 1, noConsultas: '5', ticket: '004545', fecha: '04/Mayo/2022', hora: '12:00', estatus: 'Pendiente' },
            { id: 2, noConsultas: '1', ticket: '004242', fecha: '04/Mayo/2022', hora: '12:00', estatus: 'Pendiente' },
        

        ];
        this.length = this.dataSource.length;

    }

    ngAfterViewInit() {

    }


}
