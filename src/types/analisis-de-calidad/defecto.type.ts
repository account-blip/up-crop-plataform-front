import { ControlCalidad } from "./control-calidad.type";

export const TIPO_DEFECTO = ['CALIDAD','CONDICION'] as const;
export type TipoDefecto = (typeof TIPO_DEFECTO)[number];

export type Defecto = {
  id: string;
  nombre: string;
  tipo: TipoDefecto;
  usosEnControles: ControlCalidadDefecto;
  createdAt?: string;
  updatedAt?: string;
};


export type ControlCalidadDefecto = {
    id: string;
    porcentaje: number
    control: ControlCalidad
    defecto: Defecto
  };

  