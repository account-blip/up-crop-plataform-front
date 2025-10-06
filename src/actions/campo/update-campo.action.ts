'use server';

import { UpdateCampoSchemaType } from '@/schemas/campo.schema';
import { updateCampo as updateCampoAPI } from '@/services/campo.service'

export async function updateCampoAction(
  id: string,
  values: Partial<UpdateCampoSchemaType>,
) {
  try {
    const success = await updateCampoAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el campo' };
    }
    return { success: 'Campo editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el campo' };
  }
}
