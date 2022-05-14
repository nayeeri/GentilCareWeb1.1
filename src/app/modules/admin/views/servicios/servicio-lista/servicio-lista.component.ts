import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ServiciosService } from '../../../../../interfaces/servicios/servicios.service';
import { firstValueFrom } from 'rxjs';
import { ServicioDTO } from '../../../../../interfaces/servicios/servicio.interface';

@Component({
  selector: 'app-service',
  templateUrl: './servicio-lista.component.html',

  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ServicioListaComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  length = 0;
  pageSize = 5;
  currentPage = 0;

  pageSizeOptions: number[] = [5, 10, 50, 100];
  displayedColumns: string[] = ['servicio', 'costo', 'descripcion', 'editar', 'borrar'];
  dataSource = new MatTableDataSource<any>();
  servicioId: number = 0;
  constructor(
      private router: Router,
      private _fuseConfirmationService: FuseConfirmationService,
      private _servicioService: ServiciosService) {}
  ngOnInit(): void {
    this.initCatalog();
  }

  initCatalog(): void {
    Promise.all([
        firstValueFrom(this._servicioService.gets())
    ]).then((response: any) => {
        this.dataSource.data = response[0].lista;
        console.log(response[0].lista);
    });
  }

  ngAfterViewInit(): void {
    this.length = this.dataSource.data.length;
    this.pageSize = 5;
    this.currentPage = 0;
    this.dataSource.paginator = this.paginator;
  }

  detalleRegistro(id: number): void {
    this.router.navigate(['/pages/servicios/registro/' + id]);
  }

  eliminarRegistro(id: number): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Eliminar Servicio',
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
          this._servicioService.delete(id).subscribe((response) => {
            this.initCatalog();
          });
      }
    });
  }

}
