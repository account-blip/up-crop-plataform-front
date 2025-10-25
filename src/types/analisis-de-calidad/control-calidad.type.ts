import { AnalisisDeCalidad } from "./analisis-de-calidad.type";
import { ControlCalidadDefecto, Defecto } from "./defecto.type";

export const TIPO_CONTROL = ['CAMPO', 'DESPACHO'] as const;
export type TipoControl = (typeof TIPO_CONTROL)[number];

export type ControlCalidad = {
  id: string;
  tipo: TipoControl;
  analisisDeCalidad: AnalisisDeCalidad;
  defectosAsignados: ControlCalidadDefecto[];
  createdAt: string;
  updatedAt: string;
};
