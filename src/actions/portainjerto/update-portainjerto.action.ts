'use server';

import { UpdatePortainjertoSchemaType } from '@/schemas/portainjerto.schema';
import { updatePortainjerto as updatePortainjertoAPI } from '@/services/portainjerto.service'

export async function updatePortainjertoAction(
  id: string,
  values: Partial<UpdatePortainjertoSchemaType>,    
) {
  try {
    const success = await updatePortainjertoAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el portainjerto' };
    }
    return { success: 'Portainjerto editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el portainjerto' };
  }
}
