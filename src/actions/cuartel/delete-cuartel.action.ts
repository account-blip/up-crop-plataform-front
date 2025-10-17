'use server';

import { deleteCuartel as deleteCuartelAPI } from '@/services/cuartel.service';

export async function deleteCuartelAction(id: string) {
  try {
    const success = await deleteCuartelAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el cuartel' };
    }
    return { success: 'Cuartel eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el cuartel' };
  }
}
