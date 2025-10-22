'use server';

import { UpdateUnidadProductivaSchemaType } from '@/schemas/unidad-productiva.schema';
import { updateUnidadaProductiva as updateUnidadaProductivaAPI } from '@/services/unidad-especifica.service'

export async function updateUnidadaProductivaAction(
  id: string,
  values: Partial<UpdateUnidadProductivaSchemaType>,
) {
  try {
    const success = await updateUnidadaProductivaAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el Unidada Productiva' };
    }
    return { success: 'Unidada Productiva editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el Unidada Productiva' };
  }
}
