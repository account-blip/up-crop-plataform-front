import { Variedad } from "../variedad.type";
import { Cuartel } from "../cuartel.type";
import { Calibre } from "./calibre.type";
import { Color } from "./color.type";
import { ControlCalidad } from "./control-calidad.type";
import { TemperaturaDia } from "./temperatura-dia.type";

export type AnalisisDeCalidad = {
  id: string;
  fecha: string;
  temperaturaBins?: number | null;
  brix?: number | null;
  variedad: Variedad;
  cuartel: Cuartel;
  calibres: Calibre[];
  colores: Color[];
  controlesCalidad: ControlCalidad[];
  temperaturasDia: TemperaturaDia[];
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
