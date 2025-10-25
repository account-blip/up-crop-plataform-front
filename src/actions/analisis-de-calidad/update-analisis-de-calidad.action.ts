'use server';

import { UpdateAnalisisDeCalidadSchemaType } from '@/schemas/analisis-de-calidad/analisis-de-calidad.schema';
import { updateAnalisisDeCalidad as updateAnalisisDeCalidadAPI } from '@/services/analisis-de-calidad/analisis-de-calidad.service'

export async function updateAnalisisDeCalidadAction(
  id: string,
  values: Partial<UpdateAnalisisDeCalidadSchemaType>,
) {
  try {
    const success = await updateAnalisisDeCalidadAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el analisis' };
    }
    return { success: 'analisis editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el analisis' };
  }
}
