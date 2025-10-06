'use server';

import { campoEspecificoSchema, CampoEspecificoSchemaType } from "@/schemas/campo-especifico.schema";
import { createCampoEspecifico as createCampoEspecificoAPI } from '@/services/campo-especifico.service'



export async function createCampoEspecificoAction(values: CampoEspecificoSchemaType) {
  const validatedFields = campoEspecificoSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createCampoEspecificoAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el campo Especifico' };
    }
    return { success: 'Campo Especifico creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el campo Especifico' };
  }
}
