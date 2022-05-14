export interface MedicamentoDto {
    _id: number;
    medicamentoId: number;
    descripcion: string;
    farmaco: string;
    nombre_quimico: string;
    presentacion: string;
    costo: number;
    existencia: boolean;
}

export interface ResponseMedicamentoListDto {
    lista: MedicamentoDto[];
    status: boolean;
}

export interface ResponseMedicamentoOne {
    medicamento: MedicamentoDto;
    status: boolean;
}

export interface RequestAddMedicamentoDto {
    data: MedicamentoDto;
}
