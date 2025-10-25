'use server';


import { UpdateDefectoSchemaType } from '@/schemas/analisis-de-calidad/defecto.schema';
import { updateDefecto as updateDefectoAPI } from '@/services/analisis-de-calidad/defecto.service'

export async function updateDefectoAction(
  id: string,
  values: Partial<UpdateDefectoSchemaType>,
) {
  try {
    const success = await updateDefectoAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el defecto' };
    }
    return { success: 'defecto editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el defecto' };
  }
}
