'use server';

import { campoSchema, CampoSchemaType } from "@/schemas/campo.schema";
import { createCampo as createCampoAPI } from '@/services/campo.service'



export async function createCampoAction(values: CampoSchemaType) {
  const validatedFields = campoSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createCampoAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el campo' };
    }
    return { success: 'Campo creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el campo' };
  }
}
