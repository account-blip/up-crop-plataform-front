import { z } from 'zod';

export const campoSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres')
});

export type CampoSchemaType = z.infer<typeof campoSchema>;


export const updateCampoSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  });
  export type UpdateCampoSchemaType = z.infer<typeof updateCampoSchema>;

export const deleteCampoSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar Campo"'),
});
export type DeleteCampoSchemaType = z.infer<typeof deleteCampoSchema>;