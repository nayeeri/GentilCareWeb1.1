import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-usuario-familiar',
  templateUrl: './usuario-familiar.component.html',
  styleUrls: ['./usuario-familiar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UsuarioFamiliarComponent implements OnInit {

    length = 0;
    pageSize = 5;
    currentPage = 0;

    pageSizeOptions: number[] = [5, 10, 50, 100];
    displayedColumns: string[] = ['nombre','apellidoPaterno','apellidoMaterno', 'parentezco'];
    dataSource: any;

  constructor() { }

  ngOnInit(): void {
  }

}
