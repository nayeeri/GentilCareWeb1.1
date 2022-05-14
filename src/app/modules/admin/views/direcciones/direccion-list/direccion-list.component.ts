import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';



@Component({
    selector: 'direccion-list',
    templateUrl: './direccion-list.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AddressListComponent implements OnInit {


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
    displayedColumns: string[] = ['calle', 'numeroExterior', 'colonia', 'municipio', 'ciudad', 'estado', 'codigoPostal', 'editar', 'borrar'];
    dataSource = [];

    ngOnInit() {
        this.length = this.dataSource.length;
        this.pageSize = 5;
        this.currentPage = 0;
        this.dataSource = [
            { id: 1, calle: 'Calle', numeroExterior: '00', colonia: 'Colonia', municipio: 'Municipio', ciudad: 'Ciudad', estado: 'Estado', codigoPostal: '00000' },
            { id: 2, calle: 'Calle', numeroExterior: '00', colonia: 'Colonia', municipio: 'Municipio', ciudad: 'Ciudad', estado: 'Estado', codigoPostal: '00000' },
            { id: 3, calle: 'Calle', numeroExterior: '00', colonia: 'Colonia', municipio: 'Municipio', ciudad: 'Ciudad', estado: 'Estado', codigoPostal: '00000' },
            { id: 4, calle: 'Calle', numeroExterior: '00', colonia: 'Colonia', municipio: 'Municipio', ciudad: 'Ciudad', estado: 'Estado', codigoPostal: '00000' },
            { id: 5, calle: 'Calle', numeroExterior: '00', colonia: 'Colonia', municipio: 'Municipio', ciudad: 'Ciudad', estado: 'Estado', codigoPostal: '00000' },


        ];
        this.length = this.dataSource.length;

    }

    ngAfterViewInit() {




    }

    detalleRegistro(id: number) {
        this.router.navigate(['/pages/direcciones/registro/' + id]);
    }

    eliminarRegistro(id: number) {
        this.direccion_id = id;
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Eliminar Dirección',
            message: '¿Está seguro de que desea eliminar este registro?',
            actions: {
                confirm: {
                    label: 'Eliminar'
                },
                 cancel: {
                    label: 'Cancelar'
                }
            }
        });
        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if (result === 'confirmed') {
            }
        });
    }
}
