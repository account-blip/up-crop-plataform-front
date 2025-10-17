import { Variedad } from "./variedad.type";
import { User } from "./user.type";
import { CampoEspecifico } from "./campo-especifico.type";
import { Cuartel } from "./cuartel.type";
import { Portainjerto } from "./portainjerto.type";

export const ESTADO_TYPE = ['PRE-PODA', 'POST-PODA'] as const;
export type EstadoType = (typeof ESTADO_TYPE)[number];

export type EstimacionDeCosecha = {
    id: string;
    hilera: number;
    arbol: number;
    dardo: number;
    ramilla: number;
    estado: EstadoType;
    foto: string;
    user: User;
    campoEspecifico: CampoEspecifico;
    cuartel: Cuartel;
    portainjerto: Portainjerto;
    variedad: Variedad;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}   