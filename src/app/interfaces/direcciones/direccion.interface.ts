import { UsersDto } from '../usuarios/usuarios.interface';
export interface AddressesDto {
    addressesId: number;
    _id: number;
    users: UsersDto;
    calle: string;
    exterior: string;
    interior: string;
    colonia: string;
    municipio: string;
    ciudad: string;
    estado: string;
    cp: string;
}

export interface ResponseListAddress {
    lista: AddressesDto[];
    status: boolean;
}
