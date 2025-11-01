import { Especie } from "../especie.type";
import { Variedad } from "../variedad.type";
import { AnalisisDeCalidad } from "./analisis-de-calidad.type";
import { Calibre } from "./calibre.type";
import { Color } from "./color.type";
import { ControlCalidad } from "./control-calidad.type";
import { UnidadInspeccion } from "./unidad-inspeccion.type";



export type AnalisisUnidadInspeccion = {
    id: string;
    analisis: AnalisisDeCalidad;
    unidadInspeccion: UnidadInspeccion;
    colores: Color[];
    calibres: Calibre[];
    especie: Especie;
    variedad: Variedad;
    controlesCalidad: ControlCalidad[];
    cantidad: number;
    indice: number;
    temperaturaBins: number;
    brix: number;
}