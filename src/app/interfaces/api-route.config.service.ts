import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({providedIn: 'root'})
export class ApiRoute {

    private _urlApi: string;

    constructor() {
        this._urlApi = `${environment.baseApi}`;
    }

    get planApi(): string{
        return `${this._urlApi}/api/Planes`;
    }

    get servicioApi(): string{
        return `${this._urlApi}/api/Servicios`;
    }

    get usuarioApi(): string{
        return `${this._urlApi}/api/Users`;
    }

    get roleApi(): string{
        return `${this._urlApi}/api/admin`;
    }

    get estudiosApi(): string{
        return `${this._urlApi}/api/Estudios`;
    }

    get especialidadApi(): string{
        return `${this._urlApi}/api/admin`;
    }

    get medicamentoApi(): string{
        return `${this._urlApi}/api/Medicamento`;
    }

    get proveedorApi(): string{
        return `${this._urlApi}/api/Proveedor`;
    }
}
