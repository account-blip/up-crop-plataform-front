'use server';

import { UpdateVaridadSchemaType } from '@/schemas/variedad.schema';
import { updateVariedad as updateVariedadAPI } from '@/services/variedad.service'

export async function updateVariedadAction(
  id: string,
  values: Partial<UpdateVaridadSchemaType>,    
) {
  try {
    const success = await updateVariedadAPI(id, values);
    if (!success) {
      return { error: 'Error al editar la variedad' };
    }
    return { success: 'Variedad editada exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar la variedad' };
  }
}
