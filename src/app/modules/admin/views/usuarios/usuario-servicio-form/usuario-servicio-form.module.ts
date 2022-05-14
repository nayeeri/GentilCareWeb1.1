import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioServicioFormComponent } from './usuario-servicio-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { usuarioServiceRoutes } from './usuario-servicio.routing';



@NgModule({
  declarations: [
      UsuarioServicioFormComponent
  ],
  imports: [
    RouterModule.forChild(usuarioServiceRoutes),
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
  ]
})
export class UsuarioServicioFormModule { }
