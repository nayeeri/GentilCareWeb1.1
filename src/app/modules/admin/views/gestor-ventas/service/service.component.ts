import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class GestorVentasServiceComponent implements OnInit {

    dataSource = [
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
