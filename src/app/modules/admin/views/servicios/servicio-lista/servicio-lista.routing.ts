import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ServicioListaComponent } from './servicio-lista.component';


export const serviceRoutingModule: Route[] = [
    {
     path : '',
     component : ServicioListaComponent
    },
];

