import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ConsultComponent implements OnInit {

    length = 0;
    pageSize = 5;
    currentPage = 0;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['noTicket','nombre', 'celular','dia','hora','interrogatorio','estudios', 'signos','historia','video'];
    dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
