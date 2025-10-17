import { z } from 'zod';

export const portainjertoSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres')
});

export type PortainjertoSchemaType = z.infer<typeof portainjertoSchema>;


export const updatePortainjertoSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  });
  export type UpdatePortainjertoSchemaType = z.infer<typeof updatePortainjertoSchema>;

export const deletePortainjertoSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar Portainjerto"'),
});
export type DeletePortainjertoSchemaType = z.infer<typeof deletePortainjertoSchema>;