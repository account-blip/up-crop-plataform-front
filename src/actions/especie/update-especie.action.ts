'use server';

import { UpdateEspecieSchemaType } from '@/schemas/especie.schema';
import { updateEspecie as updateEspecieAPI } from '@/services/especie.service'

export async function updateEspecieAction(
  id: string,
  values: Partial<UpdateEspecieSchemaType>,
) {
  try {
    const success = await updateEspecieAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el especie' };
    }
    return { success: 'especie editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el especie' };
  }
}
