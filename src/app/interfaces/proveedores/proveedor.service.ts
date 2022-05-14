import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoute } from '../api-route.config.service';
import { ResponseGeneralDto } from '../estudios';
import { ProveedorDto, RequestAddProveedorDto, ResponseProveedorListDto, ResponseProveedorOne } from './proveedor.interface';

@Injectable({providedIn: 'root'})
export class ProveedorService {
    constructor(
        private _httpClient: HttpClient,
        private _apiRoute: ApiRoute
    ) { }

    get(proveedorId: number): Observable<ResponseProveedorOne>{
        return this._httpClient.get<ResponseProveedorOne>(`${this._apiRoute.proveedorApi}/muestraProvedor/${proveedorId}`);
    }

    gets(): Observable<ResponseProveedorListDto[]>{
        return this._httpClient.get<ResponseProveedorListDto[]>(`${this._apiRoute.proveedorApi}/listaProveedores`);
    }

    create(proveedorDto: RequestAddProveedorDto): Observable<ResponseGeneralDto>{
        return this._httpClient.post<ResponseGeneralDto>(`${this._apiRoute.proveedorApi}/creaProvedor`, proveedorDto);
    }

    update(proveedorDto: ProveedorDto, id: number): Observable<ResponseGeneralDto>{
        return this._httpClient.put<ResponseGeneralDto>(`${this._apiRoute.proveedorApi}/editaProvedor/${id}`, proveedorDto);
    }

    delete(proveedorId: number): Observable<ResponseGeneralDto>{
        return this._httpClient.delete<ResponseGeneralDto>(`${this._apiRoute.proveedorApi}/eliminaProvedor/${proveedorId}`);
    }
}
