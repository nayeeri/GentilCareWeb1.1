import { Component, Input, OnInit } from '@angular/core';
import { EnumMenuNavService } from '../../../model/menu/model';

@Component({
  selector: 'app-nav-services',
  templateUrl: './nav-services.component.html',
  styleUrls: ['./nav-services.component.scss']
})
export class NavServicesComponent implements OnInit {

  @Input() opcion: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  isSelected(value): boolean{
    return value === this.opcion;
  }

}
