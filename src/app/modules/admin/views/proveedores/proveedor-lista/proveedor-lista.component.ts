import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { EnumMenuNavService } from 'model/menu';
import { firstValueFrom } from 'rxjs';
import { ProveedorDto } from '../../../../../interfaces/proveedores/proveedor.interface';
import { ProveedorService } from '../../../../../interfaces/proveedores/proveedor.service';

@Component({
  selector: 'app-proveedor-lista',
    templateUrl: './proveedor-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ProveedorListaComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    length = 0;
    pageSize = 5;
    currentPage = 0;
    paginaActual = EnumMenuNavService.proveedor;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['nombre','email', 'costo','celular', 'editar','borrar'];
    dataSource = new MatTableDataSource<ProveedorDto>([]);
    proveedorId: number = 0;

    isEdit: boolean = false;
    selectProveedor: ProveedorDto;

  constructor(
      private router: Router,
      private _fuseConfirmationService: FuseConfirmationService,
      private _proveedorService: ProveedorService
    ) { }

      ngOnInit(): void {
        this.initCatalog();
      }

      initCatalog(): void{
          Promise.all([
            firstValueFrom(this._proveedorService.gets())
          ]).then( (result: any) => {
            this.dataSource.data = result[0].lista;
          });
      }

      ngAfterViewInit(): void{
        this.length = this.dataSource.data.length;
        this.pageSize = 5;
        this.currentPage = 0;
        this.dataSource.paginator = this.paginator;
      }

    detalleRegistro(id: number): void {
        this.router.navigate(['/pages/proveedores/registro/' + id]);
    }

    eliminarRegistro(id: number): void {
        this.proveedorId = id;
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
            this._proveedorService.delete(id).subscribe((response)=>{
                this.initCatalog();
            });
        }
        });
    }

}
