import { z } from 'zod';

export const campoEspecificoSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  campoId: z.string()
});

export type CampoEspecificoSchemaType = z.infer<typeof campoEspecificoSchema>;


export const updateCampoEspecificoSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  campoId: z.string()
  });
  export type UpdateCampoEspecificoSchemaType = z.infer<typeof updateCampoEspecificoSchema>;

export const deleteCampoEspecificoSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar Campo"'),
});
export type DeleteCampoEspecificoSchemaType = z.infer<typeof deleteCampoEspecificoSchema>;