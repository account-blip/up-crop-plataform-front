import { z } from 'zod'

// Enum de estados
export const ESTADO_TYPE = ['PRE-PODA', 'POST-PODA'] as const
export type EstadoType = (typeof ESTADO_TYPE)[number]

// Schema principal
export const EstimacionDeCosechaSchema = z.object({
  hilera: z.coerce.number().min(1, 'La hilera debe ser un número mayor o igual a 1'),
  arbol: z.coerce.number().min(1, 'El árbol debe ser un número mayor o igual a 1'),
  dardo: z.coerce.number().min(0, 'El dardo debe ser un número válido'),
  ramilla: z.coerce.number().min(0, 'La ramilla debe ser un número válido'),
  estado: z.enum(ESTADO_TYPE),
  foto: z.string().url('Debe ser una URL válida').optional(),
  userId: z.string(),
  campoEspecificoId: z.string(),
  cuartelId: z.string(),
  portainjertoId: z.string(),
  variedadId: z.string(),
});


export type EstimacionDeCosechaSchemaType = z.infer<typeof EstimacionDeCosechaSchema>

// Update schema 
export const updateEstimacionDeCosechaSchema = z.object({
  hilera: z.number().min(1, 'La hilera debe ser un número mayor o igual a 1'),
  arbol: z.number().min(1, 'El árbol debe ser un número mayor o igual a 1'),
  dardo: z.number().min(0, 'El dardo debe ser un número válido'),
  ramilla: z.number().min(0, 'La ramilla debe ser un número válido'),
  estado: z.enum(ESTADO_TYPE),
  foto: z.string().url('Debe ser una URL válida').optional(),
  userId: z.string(),
  campoEspecificoId: z.string(),
  cuartelId: z.string(),
  portainjertoId: z.string(),
  variedadId: z.string()
})
export type UpdateEstimacionDeCosechaSchemaType = z.infer<
  typeof updateEstimacionDeCosechaSchema
>

// Delete schema (confirmación)
export const deleteEstimacionDeCosechaSchema = z.object({
  confirmation: z
    .string()
    .refine((val) => val === 'Eliminar Estimacion de cosecha'),
})
export type DeleteEstimacionDeCosechaSchemaType = z.infer<
  typeof deleteEstimacionDeCosechaSchema
>
