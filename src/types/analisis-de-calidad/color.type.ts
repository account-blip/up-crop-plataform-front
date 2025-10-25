import { AnalisisDeCalidad } from "./analisis-de-calidad.type";

export type Color = {
    id: string;
    fecha: string;
    color: string;
    cantidad: number;
    porcentaje?: number | null;
    analisisDeCalidad: AnalisisDeCalidad;
    createdAt: string;
    updatedAt: string;
  };
  