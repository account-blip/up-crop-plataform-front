'use server';

import { deleteAnalisisDeCalidad as deleteAnalisisDeCalidadAPI } from '@/services/analisis-de-calidad/analisis-de-calidad.service';

export async function deleteAnalisisDeCalidadAction(id: string) {
  try {
    const success = await deleteAnalisisDeCalidadAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el analisis' };
    }
    return { success: 'analisis eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el analisis' };
  }
}
