import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'app/shared/shared.module';
import { AuthValidatePinComponent } from './validate-pin.component';
import { authValidatePinRoutes } from './validate-pin.routing';


@NgModule({
    declarations: [
        AuthValidatePinComponent
    ],
    imports     : [
        RouterModule.forChild(authValidatePinRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        SharedModule
    ]
})
export class AuthValidatePinModule
{
}
