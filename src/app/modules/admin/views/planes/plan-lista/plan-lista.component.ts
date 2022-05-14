import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { firstValueFrom } from 'rxjs';
import { ResponsePlanesListDto, PlanDto, PlanService } from '../../../../../interfaces/planes';
import { ServicioDTO } from '../../../../../interfaces/servicios/servicio.interface';

@Component({
  selector: 'app-plan-lista',
  templateUrl: './plan-lista.component.html',

  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PlanListaComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;


  length = 0;
  pageSize = 5;
  currentPage = 0;

  pageSizeOptions: number[] = [5, 10, 50, 100];
  displayedColumns: string[] = ['nombre', 'costo', 'descripcion','servicio', 'editar', 'borrar'];
  dataSource = new MatTableDataSource<PlanDto>([]);
  servicioId: number = 0;
  list: ResponsePlanesListDto[] = [];

  constructor(
      private router: Router,
      private _fuseConfirmationService: FuseConfirmationService,
      private _planService: PlanService
  ) {}

  ngOnInit(): void {
    this.initCatalog();
  }

  initCatalog(): void{
      Promise.all([
        firstValueFrom(this._planService.gets())
      ]).then( (result: any) => {
        this.dataSource.data = result[0].planes;
      });
  }

  ngAfterViewInit(): void{
    this.length = this.dataSource.data.length;
    this.pageSize = 5;
    this.currentPage = 0;
    this.dataSource.paginator = this.paginator;
  }

  detalleRegistro(id: number): void {
    this.router.navigate(['/pages/planes/registro/' + id]);
  }

  getListServicios(servicios: ServicioDTO[]): string[]{
      if(servicios.length > 0){
        return servicios.map(item => item.nombre);
      }else{
        return [];
      }
  }

  eliminarRegistro(id: number): void {
    this.servicioId = id;
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Eliminar Plan',
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
        this._planService.delete(id).subscribe((response)=>{
            this.initCatalog();
        });
      }
    });
  }

}
