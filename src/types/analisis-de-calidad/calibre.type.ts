import { AnalisisDeCalidad } from "./analisis-de-calidad.type";
import { AnalisisUnidadInspeccion } from "./analisis-unidad-inspeccion.entity";

export type Calibre = {
    id: string;
    calibre: string;
    cantidad: number;
    porcentaje?: number;
    analisisUnidad: AnalisisUnidadInspeccion;
    createdAt: string;
    updatedAt: string;
  };
  