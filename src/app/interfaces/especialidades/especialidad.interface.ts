export interface EspecialidadsDto {
    _id: number;
    especialidadsId: number;
    especialidad: string;
    costo: number;
    created_at: Date;
}

export interface ResponseEspecialidadsList {
    lista: EspecialidadsDto[];
    status: boolean;
}

export interface RequestEspecialidadsDto {
    data: EspecialidadsDto;
}

export interface ResponseEspecialidadsOne {
    especialidad: EspecialidadsDto;
    status: boolean;
}
