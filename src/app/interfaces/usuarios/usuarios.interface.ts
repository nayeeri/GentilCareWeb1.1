import { RolesDto } from '../roles';

export interface UsersDto {
    _id: number;
    usersId: number;
    email: string;
    nombre: string;
    a_P: string;
    a_M: string;
    surnames: string;
    filename: string;
    fecha_nac: Date;
    sexo: string;
    cellphone: string;
    customerID: string;
    preguntaUno: string;
    preguntaDos: string;
    preguntaTres: string;
    status: boolean;
    token: string;
    pin: string;
    role: RolesDto;
    auth: AuthsDto;
    tipo: string;
    name: string;
    tel_part: string;
    colaborador: boolean;
    password: string;
    parentezco: string;
}

export interface ColaUserDto {
    calle: string;
    ciudad: string;
    colonia: string;
    cp: string;
    estado: string;
    exterior: string;
    municipio: string;
}

export interface RequestUser {
    cola: ColaUserDto;
    data: UsersDto;
}

export interface ResponseFamiliarOne {
    familiar: UsersDto;
    status: boolean;
}

export interface ResponseVerFamiliares {
    familiares: UsersDto[];
    status: boolean;
}

export interface ResponseVerColaboradores {
    doctores: UsersDto;
    status: boolean;
}

export interface AuthsDto {
    authsId: number;
    roles: RolesDto;
    username: string;
    password: string;
    verified: boolean;
    created_at?: Date;
    acceso: string;
    status: boolean;
    token: string;
    usersId: number;
}

