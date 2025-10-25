import { AnalisisDeCalidad } from "./analisis-de-calidad.type";
import { TemperaturaHora } from "./temperatura-hora.type";

export type TemperaturaDia = {
  id: string;
  fecha: string;
  temperatura: number;
  analisisDeCalidad: AnalisisDeCalidad;
  temperaturasHora: TemperaturaHora[];
  createdAt: string;
  updatedAt: string;
};
