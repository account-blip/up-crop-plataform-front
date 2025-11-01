import { z } from "zod"

/* ========================================
 🧭 DEFECTO
======================================== */
export const DefectoCantidadSchema = z.object({
  id: z.string().min(1, 'El defecto es obligatorio'),
  porcentaje: z
    .number()
    .min(0, 'El porcentaje debe ser mayor o igual a 0')
    .max(100, 'El porcentaje no puede superar 100'),
})
export type DefectoCantidadSchemaType = z.infer<typeof DefectoCantidadSchema>

/* ========================================
 🧭 CONTROL DE CALIDAD
======================================== */
export const ControlCalidadSchema = z.object({
  defectos: z
    .array(DefectoCantidadSchema)
    .nonempty('Debe agregar al menos un defecto'),
})
export type ControlCalidadSchemaType = z.infer<typeof ControlCalidadSchema>

/* ========================================
 🧭 COLOR
======================================== */
export const ColorSchema = z.object({
  color: z.string().min(1, 'El color es obligatorio'),
  cantidad: z.number().min(0).optional(),
})
export type ColorSchemaType = z.infer<typeof ColorSchema>

/* ========================================
 🧭 CALIBRE
======================================== */
export const CalibreSchema = z.object({
  calibre: z.string().min(1, 'El calibre es obligatorio'),
  cantidad: z.coerce.number().optional() as unknown as z.ZodNumber,
})
export type CalibreSchemaType = z.infer<typeof CalibreSchema>

/* ========================================
 🧭 UNIDAD DE INSPECCIÓN
======================================== */
export const UnidadInspeccionSchema = z.object({
  id: z.string().min(1, 'Debe seleccionar una unidad'),
  cantidad: z.number().min(1, 'Debe indicar una cantidad válida'),
})
export type UnidadInspeccionSchemaType = z.infer<typeof UnidadInspeccionSchema>

/* ========================================
 🧭 INSPECCIÓN POR UNIDAD
======================================== */
export const InspeccionUnidadSchema = z.object({
  indice: z.number().optional(),

  calibres: z
    .array(CalibreSchema)
    .nonempty('Debe agregar al menos un calibre'),

  colores: z
    .array(ColorSchema)
    .nonempty('Debe agregar al menos un color'),

  controlesCalidad: z
    .array(ControlCalidadSchema)
    .nonempty('Debe agregar al menos un control de calidad'),

  variedadId: z.string().min(1, 'La variedad es obligatoria'),
  especieId: z.string().min(1, 'La especie es obligatoria'),
  temperaturaBins: z.coerce.number().optional() as unknown as z.ZodNumber,
  brix: z.coerce.number().optional() as unknown as z.ZodNumber,
  
})
export type InspeccionUnidadSchemaType = z.infer<typeof InspeccionUnidadSchema>

/* ========================================
 🧪 ANALISIS DE CALIDAD (principal)
======================================== */
export const AnalisisDeCalidadSchema = z.object({
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  cuartelId: z.string().min(1, 'El cuartel es obligatorio'),
  etapaId: z.string().min(1, 'La etapa es obligatoria'),
  unidadInspeccion: UnidadInspeccionSchema,
  universoMuestra: z.number().min(1, 'El universo de muestra es obligatorio'),
  // 👇 N inspecciones (según cantidad)
  inspecciones: z
    .array(InspeccionUnidadSchema)
    .nonempty('Debe crear al menos una inspección'),
})

export type AnalisisDeCalidadSchemaType = z.infer<typeof AnalisisDeCalidadSchema>



/* ==========================================
   Sub-schemas (UPDATE) con id y _delete
   - Todos los campos opcionales
   - _delete: true => borrar ese registro
========================================== */
const UpdateCalibreItemSchema = z.object({
  fecha: z.string().optional(),
  calibre: z.string().optional(),
  cantidad: z.coerce.number().min(0).optional(),
  porcentaje: z.coerce.number().min(0).max(100).optional(),
  _delete: z.boolean().optional(),
})

const UpdateColorItemSchema = z.object({
  fecha: z.string().optional(),
  color: z.string().optional(),
  cantidad: z.coerce.number().min(0).optional(),
  porcentaje: z.coerce.number().min(0).max(100).optional(),
  _delete: z.boolean().optional(),
})

const UpdateControlCalidadItemSchema = z.object({
  defectos: z.string().optional(),
  porcentaje_defecto_calidad: z.coerce.number().min(0).max(100).optional(),
  porcentaje_defecto_condicion: z.coerce.number().min(0).max(100).optional(),
  _delete: z.boolean().optional(),
})

/* ================================
   Schema principal (UPDATE)
   - Todo opcional
   - Arreglos permiten crear/editar/borrar
================================ */
export const UpdateAnalisisDeCalidadSchema = z.object({
  fecha: z.string().optional(),
  temperatura_bins: z.coerce.number().optional(),
  brix: z.coerce.number().optional(),
  variedadId: z.string().optional(),
  cuartelId: z.string().optional(),

  // Lista de cambios a aplicar en cada colección
  calibres: z.array(UpdateCalibreItemSchema).optional(),
  colores: z.array(UpdateColorItemSchema).optional(),
  controlesCalidad: z.array(UpdateControlCalidadItemSchema).optional(),
})

export type UpdateAnalisisDeCalidadSchemaType = z.infer<typeof UpdateAnalisisDeCalidadSchema>

/* ================================
   Schema (DELETE) con confirmación
================================ */
export const deleteAnalisisDeCalidadSchema = z.object({
  confirmation: z
    .string()
    .refine((v) => v === "Eliminar Análisis de Calidad", {
      message: 'Debes escribir: "Eliminar Análisis de Calidad"',
    }),
})

export type DeleteAnalisisDeCalidadSchemaType = z.infer<typeof deleteAnalisisDeCalidadSchema>
