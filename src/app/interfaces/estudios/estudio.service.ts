import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoute } from '../api-route.config.service';
import { EstudiosDto, RequestEstudiosDto, ResponseEstudiosList } from './estudio.interface';


@Injectable({providedIn: 'root'})
export class EstudiosService {
    constructor(
        private _httpClient: HttpClient,
        private _apiRoute: ApiRoute
    ) { }

    get(estudioId: number): Observable<EstudiosDto>{
        return this._httpClient.get<EstudiosDto>(`${this._apiRoute.estudiosApi}/listaEstudios/${estudioId}`);
    }

    gets(): Observable<ResponseEstudiosList>{
        return this._httpClient.get<ResponseEstudiosList>(`${this._apiRoute.estudiosApi}/listaEstudios`);
    }

    create(estudioDto: RequestEstudiosDto ): Observable<EstudiosDto>{
        return this._httpClient.post<EstudiosDto>(`${this._apiRoute.estudiosApi}/crearEstudio`, estudioDto);
    }

    update(estudioDto: EstudiosDto, id: number): Observable<EstudiosDto>{
        return this._httpClient.put<EstudiosDto>(`${this._apiRoute.estudiosApi}/editaServicio/${id}`, estudioDto);
    }

    delete(serviceId: number): Observable<boolean>{
        return this._httpClient.delete<boolean>(`${this._apiRoute.estudiosApi}/eliminaEstudio/${serviceId}`);
    }

}
