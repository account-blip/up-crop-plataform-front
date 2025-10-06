import { Campo } from "./campo.type";

export type CampoEspecifico = {
    id: string;
    nombre: string;
    campo: Campo;
    deletedAt?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  