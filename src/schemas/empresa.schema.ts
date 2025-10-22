import { z } from 'zod';

export const empresaSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres')
});

export type EmpresaSchemaType = z.infer<typeof empresaSchema>;


export const updateEmpresaSchema = z.object({
  nombre: z.string().min(2, 'La descripcion debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  });
  export type UpdateEmpresaSchemaType = z.infer<typeof updateEmpresaSchema>;

export const deleteEmpresaSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar Empresa"'),
});
export type DeleteEmpresaSchemaType = z.infer<typeof deleteEmpresaSchema>;