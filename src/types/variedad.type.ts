import { Especie } from "./especie.type";
import { EstimacionDeCosecha } from "./estimacion-de-cosecha.type";


export type Variedad = {
    id: string;
    nombre: string;
    estimacionesDeCosecha: EstimacionDeCosecha[];
    especie:Especie;
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  