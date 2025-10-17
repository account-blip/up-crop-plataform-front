'use server';

import { UpdateCuartelSchemaType } from '@/schemas/cuartel.schema';
import { updateCuartel as updateCuartelAPI } from '@/services/cuartel.service'

export async function updateCuartelAction(
  id: string,
  values: Partial<UpdateCuartelSchemaType>,
) {
  try {
    const success = await updateCuartelAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el cuartel' };
    }
    return { success: 'Cuartel editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el cuartel' };
  }
}
