import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RolFormComponent } from './rol-form.component';
import { formRolRoutes } from './rol-form.routing';


@NgModule({
    declarations: [
       RolFormComponent
    ],
    imports     : [
        RouterModule.forChild(formRolRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        FuseAlertModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule
    ],
    providers: [
        MatDatepickerModule,
    ],
})
export class RolFormModule
{
}
