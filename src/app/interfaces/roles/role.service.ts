import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoute } from '../api-route.config.service';
import { RolesDto, RequestRoles } from './role.interface';

@Injectable({providedIn: 'root'})
export class RoleService {

    constructor(
        private _httpClient: HttpClient,
        private _apiRoute: ApiRoute
    ) { }

    get(roleId: number): Observable<RolesDto>{
        return this._httpClient.get<RolesDto>(`${this._apiRoute.roleApi}/getData/${roleId}`);
    }

    gets(): Observable<RolesDto[]>{
        return this._httpClient.get<RolesDto[]>(`${this._apiRoute.roleApi}/listaRoles`);
    }

    update(roleDto: RolesDto): Observable<boolean>{
        return this._httpClient.put<boolean>(`${this._apiRoute.roleApi}/edit`, roleDto);
    }

    delete(roleId: number): Observable<boolean>{
        return this._httpClient.delete<boolean>(`${this._apiRoute.roleApi}/eliminarRol/${roleId}`);
    }

    add(roleDto: RequestRoles): Observable<RolesDto>{
        return this._httpClient.post<RolesDto>(`${this._apiRoute.roleApi}/crearRol`, roleDto);
    }

}
