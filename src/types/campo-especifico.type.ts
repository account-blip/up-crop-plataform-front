import { Campo } from "./campo.type";
import { Cuartel } from "./cuartel.type";
import { EstimacionDeCosecha } from "./estimacion-de-cosecha.type";

export type CampoEspecifico = {
    id: string;
    nombre: string;
    campo: Campo;
    cuarteles: Cuartel[];
    estimacionesDeCosecha: EstimacionDeCosecha[];
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  