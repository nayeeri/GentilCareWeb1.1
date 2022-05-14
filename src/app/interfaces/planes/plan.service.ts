import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoute } from '../api-route.config.service';
import { ResponseGeneralDto, PlanDto, ResponsePlanesListDto, RequestAddPlanesDto } from './plan.interface';

@Injectable({providedIn: 'root'})
export class PlanService {
    constructor(
        private _httpClient: HttpClient,
        private _apiRoute: ApiRoute
    ) { }

    get(planId: number): Observable<PlanDto>{
        return this._httpClient.get<PlanDto>(`${this._apiRoute.planApi}/muestraPlan/${planId}`);
    }

    gets(): Observable<ResponsePlanesListDto[]>{
        return this._httpClient.get<ResponsePlanesListDto[]>(`${this._apiRoute.planApi}/listaPlanes`);
    }

    create(planesDto: RequestAddPlanesDto): Observable<ResponseGeneralDto>{
        return this._httpClient.post<ResponseGeneralDto>(`${this._apiRoute.planApi}/crearPlan`, planesDto);
    }

    delete(planId: number): Observable<ResponseGeneralDto>{
        return this._httpClient.delete<ResponseGeneralDto>(`${this._apiRoute.planApi}/eliminarPlan/${planId}`);
    }
}
