import { ServicioDTO } from '../servicios/servicio.interface';
export interface PlanDto {
    _id: number;
    planesId: number;
    costo: number;
    descripcion: string;
    nombre: string;
    servicios: ServicioDTO[];
}

export interface ResponseGeneralDto {
    msg: string;
    status: boolean;
}

export interface ResponsePlanesListDto {
    planes: PlanDto[];
    status: boolean;
}

export interface RequestAddPlanesDto {
    data: PlanDto;
}
