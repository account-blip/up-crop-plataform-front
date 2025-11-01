'use server';

import { deleteEspecie as deleteEspecieAPI } from '@/services/especie.service';

export async function deleteEspecieAction(id: string) {
  try {
    const success = await deleteEspecieAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el especie' };
    }
    return { success: 'especie eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el especie' };
  }
}
