import { z } from 'zod';

export const unidadInspeccionSchema = z.object({
  nombre: z.string().min(2, 'El Nombre debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres')
});

export type UnidadInspeccionSchemaType = z.infer<typeof unidadInspeccionSchema>;


export const updateUnidadInspeccionSchema = z.object({
  nombre: z.string().min(2, 'El Nombre debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  });
  export type UpdateUnidadInspeccionSchemaType = z.infer<typeof updateUnidadInspeccionSchema>;

export const deleteUnidadInspeccionSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar UnidadInspeccion"'),
});
export type DeleteUnidadInspeccionSchemaType = z.infer<typeof deleteUnidadInspeccionSchema>;