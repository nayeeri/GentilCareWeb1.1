import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { EstudiosService } from 'app/interfaces/estudios';
import { EnumMenuNavService } from '../../../../../../model/menu/model';
import { EstudiosDto } from '../../../../../interfaces/estudios/estudio.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-estudio-lista',
  templateUrl: './estudio-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EstudioListaComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  length = 0;
  pageSize = 5;
  currentPage = 0;
  paginaActual = EnumMenuNavService.estudio;

  pageSizeOptions: number[] = [5, 10, 50, 100];
  displayedColumns: string[] = ['estudio', 'descripcion', 'costo', 'editar', 'borrar'];
  dataSource = new MatTableDataSource<any>([]);
  estudioId: number = 0;

  constructor(
      private router: Router,
      private _fuseConfirmationService: FuseConfirmationService,
      private _estudioService: EstudiosService
  ) { }

  ngOnInit(): void {
    this.initCatalog();
  }

  initCatalog(): void {
    Promise.all([
        firstValueFrom(this._estudioService.gets())
    ]).then((response: any) => {
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
    this.router.navigate(['/pages/estudios/registro/' + id]);
  }

  eliminarRegistro(id: number): void {
    this.estudioId = id;
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Eliminar Estudio',
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
          this._estudioService.delete(id).subscribe((response) =>{
            this.initCatalog();
          });
      }
    });
  }

}
