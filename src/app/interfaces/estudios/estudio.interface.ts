export interface EstudiosDto {
    estudiosId: number;
    _id: number;
    identificador: string;
    estudio: string;
    descripcion: string;
    status: boolean;
    nombre: string;
    created_at: Date;
}

export interface ResponseEstudiosList {
    lista: EstudiosDto[];
    status: boolean;
}

export interface RequestEstudiosDto {
    data: EstudiosDto;
}

export interface ResponseEstudiosOne {
    estudio: EstudiosDto;
    status: boolean;
}

export interface ResponseGeneralDto {
    estudio: EstudiosDto;
    status: boolean;
}
