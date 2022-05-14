import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class GestorVentasSeguimientoComponent implements OnInit {

    length = 0;
    pageSize = 5;
    currentPage = 0;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['noTicket','usuario','nombre', 'celular','status'];
    dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
