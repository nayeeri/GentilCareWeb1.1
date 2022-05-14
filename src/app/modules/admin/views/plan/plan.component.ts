import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class PlanComponent implements OnInit {

    dataSource = [
        { costo : '340.0', descripcion: 'Plan 1 ', plan:'Plan 1', servicios :'128 GB SSD disk' },
        { costo : '78.0', descripcion: 'Plan 3 ', plan:'Plan 3', servicios :'1TB' },
        { costo : '800.0', descripcion: 'prueba', plan:'Consulta 6 meses', servicios :'Consulta Médica' }
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
