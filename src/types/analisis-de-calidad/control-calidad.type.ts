import { AnalisisDeCalidad } from "./analisis-de-calidad.type";
import { AnalisisUnidadInspeccion } from "./analisis-unidad-inspeccion.entity";
import { ControlCalidadDefecto, Defecto } from "./defecto.type";


export type ControlCalidad = {
  id: string;
  defectosAsignados: ControlCalidadDefecto[];
  analisisUnidad: AnalisisUnidadInspeccion;
  createdAt: string;
  updatedAt: string;
};
