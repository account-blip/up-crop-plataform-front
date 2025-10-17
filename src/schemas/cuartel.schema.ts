import { z } from 'zod';

export const cuartelSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  campoEspecificoId: z.string()
});

export type CuartelSchemaType = z.infer<typeof cuartelSchema>;


export const updateCuartelSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  campoEspecificoId: z.string()
  });
  export type UpdateCuartelSchemaType = z.infer<typeof updateCuartelSchema>;

export const deleteCuartelSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar Cuartel"'),
});
export type DeleteCuartelSchemaType = z.infer<typeof deleteCuartelSchema>;