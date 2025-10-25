import { AnalisisDeCalidad } from "./analisis-de-calidad.type";

export type Calibre = {
    id: string;
    fecha: string;
    calibre: string;
    cantidad: number;
    porcentaje?: number | null;
    analisisDeCalidad: AnalisisDeCalidad;
    createdAt: string;
    updatedAt: string;
  };
  