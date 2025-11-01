import { AnalisisDeCalidad } from "./analisis-de-calidad.type";
import { AnalisisUnidadInspeccion } from "./analisis-unidad-inspeccion.entity";

export type Color = {
    id: string;
    color: string;
    cantidad: number;
    porcentaje?: number | null;
    analisisUnidad: AnalisisUnidadInspeccion;
    createdAt: string;
    updatedAt: string;
  };
  