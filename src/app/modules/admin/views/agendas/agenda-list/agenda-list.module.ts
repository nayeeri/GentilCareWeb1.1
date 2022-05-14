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
import {  listAgendaRoutes } from './agenda-list.routing';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  AgendaListComponent } from './agenda-list.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        AgendaListComponent,
    ],
    imports     : [
        RouterModule.forChild(listAgendaRoutes),
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
        SharedModule
    ]
})
export class AgendaListModule
{
}
