'use server';

import { deleteUnidadProductiva as deleteUnidadProductivaAPI } from '@/services/unidad-especifica.service';

export async function deleteUnidadProductivaAction(id: string) {
  try {
    const success = await deleteUnidadProductivaAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el unidad productiva'};
    }
    return { success: 'unidad productiva eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el unidad productiva' };
  }
}
