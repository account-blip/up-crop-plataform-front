import { Cuartel } from "../cuartel.type";
import { TemperaturaDia } from "./temperatura-dia.type";
import { EtapaInspeccion } from "./etapa-inspeccion.type";
import { UnidadInspeccion } from "./unidad-inspeccion.type";
import { AnalisisUnidadInspeccion } from "./analisis-unidad-inspeccion.entity";
import { Empresa } from "../empresa.type";
import { User } from "../user.type";

export type AnalisisDeCalidad = {
  id: string;
  fecha: Date;
  temperaturaBins?: number | null;
  brix?: number | null;
  universoMuestra: number;
  cuartel: Cuartel;
  etapaInspeccion: EtapaInspeccion;
  unidadInspeccion: UnidadInspeccion;
  unidadesInspeccion: AnalisisUnidadInspeccion[];
  temperaturasDia: TemperaturaDia[];
  empresa: Empresa;
  user:User;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
