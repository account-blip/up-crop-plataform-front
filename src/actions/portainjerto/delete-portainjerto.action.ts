'use server';

import { deletePortainjerto as deletePortainjertoAPI } from '@/services/portainjerto.service';

export async function deletePortainjertoAction(id: string) {    
  try {
    const success = await deletePortainjertoAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el portainjerto' };
    }
    return { success: 'Portainjerto eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el portainjerto' };
  }
}
