import { z } from 'zod';

export const variedadSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres')
});

export type VariedadSchemaType = z.infer<typeof variedadSchema>;  


export const updateVariedadSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  });
  export type UpdateVaridadSchemaType = z.infer<typeof updateVariedadSchema>;

export const deleteVariedadSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar Variedad"'),
});
export type DeleteVaridadSchemaType = z.infer<typeof deleteVariedadSchema>;