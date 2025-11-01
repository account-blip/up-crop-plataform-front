import { z } from 'zod';

export const unidadProductivaSchema = z.object({
  nombre: z.string().min(2, 'El Nombre debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  empresaId: z.string()
});

export type UnidadProductivaSchemaType = z.infer<typeof unidadProductivaSchema>;


export const updateUnidadProductivaSchema = z.object({
  nombre: z.string().min(2, 'El Nombres debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  empresaId: z.string()
  });
  export type UpdateUnidadProductivaSchemaType = z.infer<typeof updateUnidadProductivaSchema>;

export const deleteUnidadProductivaSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar UnidadProductiva"'),
});
export type DeleteUnidadProductivaSchemaType = z.infer<typeof deleteUnidadProductivaSchema>;