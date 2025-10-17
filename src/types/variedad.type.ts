import { EstimacionDeCosecha } from "./estimacion-de-cosecha.type";


export type Variedad = {
    id: string;
    nombre: string;
    estimacionesDeCosecha: EstimacionDeCosecha[];
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  