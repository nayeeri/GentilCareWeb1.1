import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { PlanListaComponent } from './plan-lista.component';


export const planRoutingModule: Route[] = [
    {
     path : '',
     component : PlanListaComponent
    },
];

