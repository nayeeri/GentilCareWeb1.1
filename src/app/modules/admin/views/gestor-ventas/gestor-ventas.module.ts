import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestorVentasConsultasComponent } from './consultas/consultas.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { gestorVentasRoutingModule } from './gestor-ventas.routing';
import { GestorVentasSeguimientoComponent } from './seguimiento/seguimiento.component';
import { GestorVentasPlanComponent } from './plan/plan.component';
import { GestorVentasServiceComponent } from './service/service.component';



@NgModule({
  declarations: [
    GestorVentasConsultasComponent,
    GestorVentasSeguimientoComponent,
    GestorVentasPlanComponent,
    GestorVentasServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(gestorVentasRoutingModule),
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    SharedModule
  ]
})
export class GestorVentasModule { }
