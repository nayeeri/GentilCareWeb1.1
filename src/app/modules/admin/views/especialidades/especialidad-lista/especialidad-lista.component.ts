import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { EnumMenuNavService } from 'model/menu';
import { EspecialidadService } from '../../../../../interfaces/especialidades/especialidad.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-especialidad-lista',
  templateUrl: './especialidad-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EspecialidadListaComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length = 0;
  pageSize = 5;
  currentPage = 0;
  paginaActual = EnumMenuNavService.especialidad;
  especialidadId: number = 0;
  pageSizeOptions: number[] = [5, 10, 50, 100];
  displayedColumns: string[] = ['nombre', 'costo', 'editar', 'borrar'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
      private router: Router,
      private _fuseConfirmationService: FuseConfirmationService,
      private _especialidadService: EspecialidadService
    ) { }

  ngOnInit(): void {
    this.initCatalog();
  }

  initCatalog(): void {
      Promise.all([
        firstValueFrom(this._especialidadService.gets())
      ]).then((response) =>{
          this.dataSource.data = response[0].lista;
      });
  }

  ngAfterViewInit(): void {
    this.length = this.dataSource.data.length;
    this.pageSize = 5;
    this.currentPage = 0;
    this.dataSource.paginator = this.paginator;
  }

  detalleRegistro(id: number): void {
    this.router.navigate(['/pages/especialidades/registro/' + id]);
  }

  eliminarRegistro(id: number): void {
    this.especialidadId = id;
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Eliminar Especialidad',
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
          this._especialidadService.delete(id).subscribe((response) => {
            this.initCatalog();
          });
      }
    });
  }

}
