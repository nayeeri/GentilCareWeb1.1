import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ScheduleComponent implements OnInit {

    length = 0;
    pageSize = 5;
    currentPage = 0;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['noTicket','nombre', 'celular','dia','hora','interrogatorio', 'doctor','cita'];
    dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
