import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoute } from '../api-route.config.service';
import { EspecialidadsDto, RequestEspecialidadsDto, ResponseEspecialidadsList, ResponseEspecialidadsOne } from './especialidad.interface';

@Injectable({providedIn: 'root'})
export class EspecialidadService {
    constructor(
        private _httpClient: HttpClient,
        private _apiRoute: ApiRoute
    ) { }

    get(especialidadId: number): Observable<ResponseEspecialidadsOne>{
        return this._httpClient.get<ResponseEspecialidadsOne>(`${this._apiRoute.especialidadApi}/muestraEspecialidad/${especialidadId}`);
    }

    gets(): Observable<ResponseEspecialidadsList>{
        return this._httpClient.get<ResponseEspecialidadsList>(`${this._apiRoute.especialidadApi}/listaEspecialidades`);
    }

    create(especialidaDto: RequestEspecialidadsDto ): Observable<EspecialidadsDto>{
        return this._httpClient.post<EspecialidadsDto>(`${this._apiRoute.especialidadApi}/creaEspecialidad`, especialidaDto);
    }

    update(especialidaDto: EspecialidadsDto, id: number): Observable<EspecialidadsDto>{
        return this._httpClient.put<EspecialidadsDto>(`${this._apiRoute.especialidadApi}/editaEspecialidad/${id}`, especialidaDto);
    }

    delete(especialidadId: number): Observable<boolean>{
        return this._httpClient.delete<boolean>(`${this._apiRoute.especialidadApi}/eliminaEspecialidad/${especialidadId}`);
    }
}
