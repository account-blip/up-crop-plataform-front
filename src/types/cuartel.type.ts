import { UnidadProductiva } from "./unidad-productiva.type";
import { EstimacionDeCosecha } from "./estimacion-de-cosecha.type";


export type Cuartel = {
    id: string;
    nombre: string;
    unidadesProductiva: UnidadProductiva;
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  