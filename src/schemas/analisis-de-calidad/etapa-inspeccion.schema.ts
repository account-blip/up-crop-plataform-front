import { z } from 'zod';

export const etapaInspeccionSchema = z.object({
  nombre: z.string().min(2, 'El Nombre debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres')
});

export type EtapaInspeccionSchemaType = z.infer<typeof etapaInspeccionSchema>;


export const updateEtapaInspeccionSchema = z.object({
  nombre: z.string().min(2, 'El Nombre debe tener al menos 2 caracteres').max(650, 'Máximo 650 caracteres'),
  });
  export type UpdateEtapaInspeccionSchemaType = z.infer<typeof updateEtapaInspeccionSchema>;

export const deleteEtapaInspeccionSchema = z.object({
  confirmation: z.string().min(0, 'Ingrese la confirmación "Eliminar EtapaInspeccion"'),
});
export type DeleteEtapaInspeccionSchemaType = z.infer<typeof deleteEtapaInspeccionSchema>;