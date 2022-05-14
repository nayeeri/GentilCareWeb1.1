import { NgModule } from '@angular/core';
import { Route } from '@angular/router';
import { PlanComponent } from './plan.component';

export const planRoutingModule: Route[] = [
    {
     path : '',
     component : PlanComponent
    },
];
