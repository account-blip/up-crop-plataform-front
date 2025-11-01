import { z } from 'zod';

export const especieSchema = z.object({
  nombre: z.string().min(2, 'El Nombre debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres')
});

export type EspecieSchemaType = z.infer<typeof especieSchema>;


export const updateEspecieSchema = z.object({
  nombre: z.string().min(2, 'El Nombre debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  });
  export type UpdateEspecieSchemaType = z.infer<typeof updateEspecieSchema>;

export const deleteEspecieSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar Especie"'),
});
export type DeleteEspecieSchemaType = z.infer<typeof deleteEspecieSchema>;