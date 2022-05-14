import { ServicioDTO } from '../servicios';

export interface SignosVitalesDto{
    signosvitalesId: number;
    servicio: ServicioDTO[];
    presionArterial: string;
    frecuencuaRespiratoria: string;
    frecuenciaCardiaca: string;
    temperatura: string;
    glucosa: string;
    saturacion: string;
}
