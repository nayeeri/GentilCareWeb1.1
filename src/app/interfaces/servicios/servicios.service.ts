import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoute } from '../api-route.config.service';
import { RequestAddServicios, ResponseServiciosDto, ServicioDTO } from './servicio.interface';

@Injectable({providedIn: 'root'})
export class ServiciosService {
    constructor(
        private _httpClient: HttpClient,
        private _apiRoute: ApiRoute
    ) { }

    get(serviceId: number): Observable<ServicioDTO>{
        return this._httpClient.get<ServicioDTO>(`${this._apiRoute.servicioApi}/muestraServicio/${serviceId}`);
    }

    gets(): Observable<ResponseServiciosDto>{
        return this._httpClient.get<ResponseServiciosDto>(`${this._apiRoute.servicioApi}/listaServicios`);
    }

    create(servicioDto: RequestAddServicios): Observable<ServicioDTO>{
        return this._httpClient.post<ServicioDTO>(`${this._apiRoute.servicioApi}/crearServicio`, servicioDto);
    }

    update(servicioDto: ServicioDTO, id: number): Observable<ServicioDTO>{
        return this._httpClient.put<ServicioDTO>(`${this._apiRoute.servicioApi}/editaServicio/${id}`, servicioDto);
    }

    delete(serviceId: number): Observable<boolean>{
        return this._httpClient.delete<boolean>(`${this._apiRoute.servicioApi}/eliminarServicio/${serviceId}`);
    }

}
