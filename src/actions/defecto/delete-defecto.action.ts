'use server';

import { deleteDefecto as deleteDefectoAPI } from '@/services/analisis-de-calidad/defecto.service';

export async function deleteDefectoAction(id: string) {
  try {
    const success = await deleteDefectoAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el defecto' };
    }
    return { success: 'defecto eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el defecto' };
  }
}
