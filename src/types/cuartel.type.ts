import { CampoEspecifico } from "./campo-especifico.type";
import { EstimacionDeCosecha } from "./estimacion-de-cosecha.type";


export type Cuartel = {
    id: string;
    nombre: string;
    campoEspecifico: CampoEspecifico;
    estimacionesDeCosecha: EstimacionDeCosecha[];
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  