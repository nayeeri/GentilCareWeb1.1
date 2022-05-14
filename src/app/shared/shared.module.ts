import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavServicesComponent } from './nav-services/nav-services.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavServicesComponent
    ],
    declarations: [
      NavServicesComponent
    ]
})
export class SharedModule
{
}
