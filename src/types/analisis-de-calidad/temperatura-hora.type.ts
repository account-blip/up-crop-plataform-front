import { TemperaturaDia } from "./temperatura-dia.type";

export type TemperaturaHora = {
    id: string;
    hora: string;
    fecha: string;
    temperaturaPulpa: number;
    temperaturaDia: TemperaturaDia;
    createdAt: string;
    updatedAt: string;
  };
  