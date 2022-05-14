import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class GestorVentasConsultasComponent implements OnInit {

    length = 0;
    pageSize = 5;
    currentPage = 0;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['noTicket','usuario','nombre', 'celular','dia','motivo','estatus'];
    dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
