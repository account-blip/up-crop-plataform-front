import { CampoEspecifico } from "./campo-especifico.type";
import { User } from "./user.type";

export type Campo = {
    id: string;
    nombre: string;
    users: User[];
    campoEspecifico: CampoEspecifico[];
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  