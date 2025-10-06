'use server';

import { UpdateCampoEspecificoSchemaType } from '@/schemas/campo-especifico.schema';
import { updateCampoEspecifico as updateCampoEspecificoAPI } from '@/services/campo-especifico.service'

export async function updateCampoEspecificoAction(
  id: string,
  values: Partial<UpdateCampoEspecificoSchemaType>,
) {
  try {
    const success = await updateCampoEspecificoAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el campo Especifico' };
    }
    return { success: 'Campo Especifico editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el campo Especifico' };
  }
}
