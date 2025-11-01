'use server';

import { deleteUnidadInspeccion as deleteUnidadInspeccionAPI } from '@/services/analisis-de-calidad/unidad-inspeccion.service';

export async function deleteUnidadInspeccionAction(id: string) {
  try {
    const success = await deleteUnidadInspeccionAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el unidad' };
    }
    return { success: 'unidad eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el unidad' };
  }
}
