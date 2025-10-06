'use server';

import { deleteCampo as deleteCampoAPI } from '@/services/campo.service';

export async function deleteCampoAction(id: string) {
  try {
    const success = await deleteCampoAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el campo' };
    }
    return { success: 'Campo eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el campo' };
  }
}
