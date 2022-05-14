import { FarmacoDto } from '../farmacos/farmaco.interface';
import { SignosVitalesDto } from '../signos-vitales/signos-vitales.interface';
export interface ServicioDTO{
    serviciosId: number;
    nombre: string;
    costo: string;
    descripcion: string;
    farmacosId: number;
    farmacos: FarmacoDto[];
    signosvitalesId: number;
    signoVitales: SignosVitalesDto[];
}

export interface ResponseServiciosDto {
    lista: ServicioDTO[];
    status: boolean;
}

export interface ResponseServiciosOne {
    servicio: ServicioDTO;
    status: boolean;
}

export interface RequestAddServicios {
    data: ServicioDTO;
}
