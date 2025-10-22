import { Cuartel } from "./cuartel.type";
import { Empresa } from "./empresa.type";
import { EstimacionDeCosecha } from "./estimacion-de-cosecha.type";

export type UnidadProductiva = {
    id: string;
    nombre: string;
    empresa: Empresa;
    cuarteles: Cuartel[];
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  