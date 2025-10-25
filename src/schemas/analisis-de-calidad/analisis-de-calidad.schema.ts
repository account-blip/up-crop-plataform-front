import { z } from "zod"

/* ========================================
 🧭 CONTROL DE CALIDAD
======================================== */
export const TIPO_CONTROL = ['CAMPO', 'DESPACHO'] as const
export type TipoControl = (typeof TIPO_CONTROL)[number]

export const ControlCalidadSchema = z.object({
  tipo: z.enum(TIPO_CONTROL).describe('El tipo de control es obligatorio'),
  analisisDeCalidadId: z.string().optional(),
  defectos: z
    .array(
      z.object({
        id: z.string().min(1, 'El defecto es obligatorio'),
        porcentaje: z
          .number()
          .min(0, 'Debe ingresar un porcentaje'),
      })
    )
    .nonempty('Debe agregar al menos un defecto'),
});


export type ControlCalidadSchemaType = z.infer<typeof ControlCalidadSchema>

/* ========================================
 🧭 CALIBRE
======================================== */
export const CalibreSchema = z.object({
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  calibre: z.string().min(1, 'El calibre es obligatorio'),
  cantidad: z.number().optional(),
  porcentaje: z.number().optional(),
  analisisDeCalidadId: z.string().optional()
})

export type CalibreSchemaType = z.infer<typeof CalibreSchema>

/* ========================================
 🧭 COLOR
======================================== */
export const ColorSchema = z.object({
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  color: z.string().min(1, 'El color es obligatorio'),
  cantidad: z.number().optional(),
  porcentaje: z.number().optional(),
  analisisDeCalidadId: z.string().optional()
})

export type ColorSchemaType = z.infer<typeof ColorSchema>

/* ========================================
 🧭 TEMPERATURA HORA
======================================== */
export const TemperaturaHoraSchema = z.object({
  hora: z.string().min(1, 'La hora es obligatoria'),
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  temperaturaPulpa: z.number().optional(),
  temperaturaDiaId: z.string().optional()
})

export type TemperaturaHoraSchemaType = z.infer<typeof TemperaturaHoraSchema>

/* ========================================
 🧭 TEMPERATURA DÍA
======================================== */
export const TemperaturaDiaSchema = z.object({
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  temperatura: z.number().optional(),
  analisisDeCalidadId: z.string().optional(),
  temperaturasHora: z.array(TemperaturaHoraSchema).optional(),
})

export type TemperaturaDiaSchemaType = z.infer<typeof TemperaturaDiaSchema>

/* ========================================
 🧭 ANALISIS DE CALIDAD (principal)
======================================== */
export const AnalisisDeCalidadSchema = z.object({
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  temperaturaBins: z.number().optional(),
  brix: z.number().optional(),
  variedadId: z.string().min(1, 'La variedad es obligatoria'),
  cuartelId: z.string().min(1, 'El cuartel es obligatorio'),

  // Relaciones anidadas
  calibres: z.array(CalibreSchema).optional(),
  colores: z.array(ColorSchema).optional(),
  controlesCalidad: z.array(ControlCalidadSchema).optional()
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
  tipo: z.enum(TIPO_CONTROL).optional(),
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
export const DeleteAnalisisDeCalidadSchema = z.object({
  confirmation: z
    .string()
    .refine((v) => v === "Eliminar Análisis de Calidad", {
      message: 'Debes escribir: "Eliminar Análisis de Calidad"',
    }),
})

export type DeleteAnalisisDeCalidadSchemaType = z.infer<typeof DeleteAnalisisDeCalidadSchema>
