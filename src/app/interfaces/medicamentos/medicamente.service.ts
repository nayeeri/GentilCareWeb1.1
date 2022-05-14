import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoute } from '../api-route.config.service';
import { ResponseGeneralDto } from '../estudios';
import { RequestAddMedicamentoDto, ResponseMedicamentoListDto } from './medicament.interface';

@Injectable({providedIn: 'root'})
export class MedicamentoService {
    constructor(
        private _httpClient: HttpClient,
        private _apiRoute: ApiRoute
    ) { }

    gets(): Observable<ResponseMedicamentoListDto>{
        return this._httpClient.get<ResponseMedicamentoListDto>(`${this._apiRoute.medicamentoApi}/listaMedicamentos`);
    }

    create(medicamentoDto: RequestAddMedicamentoDto ): Observable<ResponseGeneralDto>{
        return this._httpClient.post<ResponseGeneralDto>(`${this._apiRoute.medicamentoApi}/creaMedicamento`, medicamentoDto);
    }

    delete(medicamentoId: number): Observable<boolean>{
        return this._httpClient.delete<boolean>(`${this._apiRoute.medicamentoApi}/eliminaMedicamento/${medicamentoId}`);
    }
}
