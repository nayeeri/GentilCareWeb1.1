import { ServicioDTO } from '../servicios';

export interface FarmacoDto{
    farmacosId: number;
    servicios: ServicioDTO[];
    farmaco: string;
    aplicacion: string;
    frecuencia: string;
    duracion: string;
    modoAplicacion: string;
};
