import { Empresa } from "./empresa.type";
import { Variedad } from "./variedad.type";


export type Especie = {
    id: string;
    nombre: string;
    variedades: Variedad[];
    empresa: Empresa;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  }