import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRoute } from '../api-route.config.service';
import { UsersDto, RequestUser, ResponseVerFamiliares, ResponseFamiliarOne, ResponseVerColaboradores } from './usuarios.interface';

@Injectable({providedIn: 'root'})
export class UsuarioService {
    constructor(
        private _httpClient: HttpClient,
        private _apiRoute: ApiRoute
    ) { }


    get(usuarioId: number): Observable<UsersDto>{
        return this._httpClient.get<UsersDto>(`${this._apiRoute.usuarioApi}/getData/${usuarioId}`);
    }

    gets(): Observable<UsersDto[]>{
        return this._httpClient.get<UsersDto[]>(`${this._apiRoute.usuarioApi}/getData`);
    }

    listaFamiliares(id: number): Observable<ResponseVerFamiliares>{
        return this._httpClient.get<ResponseVerFamiliares>(`${this._apiRoute.usuarioApi}/listaFamiliares/${id}`);
    }

    listaColaboradores(): Observable<ResponseVerColaboradores[]>{
        return this._httpClient.get<ResponseVerColaboradores[]>(`${this._apiRoute.usuarioApi}/listaColaboradores`);
    }

    muestraUsuario(id: number): Observable<ResponseFamiliarOne>{
        return this._httpClient.get<ResponseFamiliarOne>(`${this._apiRoute.usuarioApi}/muestraUsuario/${id}`);
    }

    add(usuarioDto: UsersDto): Observable<UsersDto>{
        return this._httpClient.post<UsersDto>(`${this._apiRoute.usuarioApi}/add`, usuarioDto);
    }

    addData(usuarioDto: RequestUser): Observable<UsersDto>{
        return this._httpClient.post<UsersDto>(`${this._apiRoute.usuarioApi}/addData`, usuarioDto);
    }

    registroSocios(usuarioDto: UsersDto): Observable<UsersDto>{
        return this._httpClient.post<UsersDto>(`${this._apiRoute.usuarioApi}/registroSocios`, usuarioDto);
    }

    agregarFamiliar(id: number,usuarioDto: UsersDto): Observable<UsersDto>{
        return this._httpClient.post<UsersDto>(`${this._apiRoute.usuarioApi}/agregarFamiliar/${id}`, usuarioDto);
    }

    update(usuarioDto: UsersDto, id: number): Observable<boolean>{
        return this._httpClient.put<boolean>(`${this._apiRoute.usuarioApi}/editarUsuario/${id}`, usuarioDto);
    }

    edit(usuarioDto: UsersDto): Observable<boolean>{
        return this._httpClient.put<boolean>(`${this._apiRoute.usuarioApi}/edit`, usuarioDto);
    }

    delete(usuarioId: number): Observable<boolean>{
        return this._httpClient.delete<boolean>(`${this._apiRoute.usuarioApi}/eliminar/${usuarioId}`);
    }

}
