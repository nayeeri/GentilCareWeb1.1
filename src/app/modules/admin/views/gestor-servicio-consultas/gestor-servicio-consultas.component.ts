import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestor-servicio-consultas',
  templateUrl: './gestor-servicio-consultas.component.html',
  styleUrls: ['./gestor-servicio-consultas.component.scss']
})
export class GestorServicioConsultasComponent implements OnInit {

    length = 0;
    pageSize = 5;
    currentPage = 0;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['usuario','noTicket','nombre', 'celular','dia','motivo','especialidad', 'estatus','doctor'];
    dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
