import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {   listDatosConsultaRoutes } from './datos-consulta-list.routing';
import { MatPaginatorModule } from '@angular/material/paginator';
import {   DatosConsultaListComponent } from './datos-consulta-list.component';
import { MatIconModule } from '@angular/material/icon';
import {  MatDividerModule } from '@angular/material/divider';


@NgModule({
    declarations: [
        DatosConsultaListComponent,
    ],
    imports     : [
        RouterModule.forChild(listDatosConsultaRoutes),
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
        MatDividerModule,
        SharedModule
    ]
})
export class DatosConsultaListModule
{
}
