import { AddressesDto } from '../direcciones/direccion.interface';
export interface ProveedorDto {
    _id: number;
    proveedorId: number;
    provedor: string;
    email: string;
    costo: number;
    cellphone: string;
    estudio: string;
    address: AddressesDto;
}

export interface ResponseProveedorListDto {
    lista: ProveedorDto[];
    status: boolean;
}

export interface ResponseProveedorOne {
    provedor: ProveedorDto;
    status: boolean;
}

export interface RequestAddProveedorDto {
    data: ProveedorDto;
}
