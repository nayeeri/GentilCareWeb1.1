import { NgModule } from '@angular/core';
import { LayoutComponent } from 'app/layout/layout.component';
import { EmptyLayoutModule } from 'app/layout/layouts/empty/empty.module';
import { MaterialLayoutModule } from 'app/layout/layouts/horizontal/material/material.module';
import { SharedModule } from 'app/shared/shared.module';
import { DefaultLayoutModule } from './layouts/horizontal/default/default.module';

const layoutModules = [
    // Empty
    EmptyLayoutModule,

    // Horizontal navigation
    MaterialLayoutModule,
    DefaultLayoutModule,
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
