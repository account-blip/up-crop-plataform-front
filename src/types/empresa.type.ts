import { UnidadProductiva } from "./unidad-productiva.type";
import { User } from "./user.type";

export type Empresa = {
    id: string;
    nombre: string;
    users: User[];
    unidadesProductiva: UnidadProductiva[];
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  