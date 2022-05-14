import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class GestorVentasPlanComponent implements OnInit {

    dataSource = [];

  constructor() { }

  ngOnInit(): void {
  }

}
