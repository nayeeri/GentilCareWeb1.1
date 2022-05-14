import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MedicamentoService } from 'app/interfaces/medicamentos/medicamente.service';
import { EnumMenuNavService } from 'model/menu';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-medicamento-lista',
    templateUrl: './medicamento-lista.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MedicamentoListaComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    length = 0;
    pageSize = 5;
    currentPage = 0;
    paginaActual = EnumMenuNavService.medicamentos;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['nombre','descripcion', 'costo','existencia','borrar'];
    dataSource = new MatTableDataSource<any>([]);
    medicamentoId: number = 0;

  constructor(
      private router: Router,
      private _fuseConfirmationService: FuseConfirmationService,
      private _medicamentoService: MedicamentoService
    ) { }

    ngOnInit(): void {
        this.initCatalog();
    }

    initCatalog(): void {
        Promise.all([
            firstValueFrom(this._medicamentoService.gets())
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
        this.router.navigate(['/pages/medicamentos/registro/' + id]);
    }

    eliminarRegistro(id: number): void {
        this.medicamentoId = id;
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
        title: 'Eliminar Medicamento',
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
                this._medicamentoService.delete(id).subscribe((response) => {
                    this.initCatalog();
                });
            }
        });
    }

}
