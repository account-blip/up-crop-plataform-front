'use server';

import { especieSchema, EspecieSchemaType } from '@/schemas/especie.schema';
import { createEspecie as createEspecieAPI } from '@/services/especie.service'



export async function createEspecieAction(values: EspecieSchemaType) {
  const validatedFields = especieSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createEspecieAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el especie' };
    }
    return { success: 'especie creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el especie' };
  }
}
