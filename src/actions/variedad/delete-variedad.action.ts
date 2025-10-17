'use server';

import { deleteVariedad as deleteVariedadAPI } from '@/services/variedad.service';

export async function deleteVariedadAction(id: string) {    
  try {
    const success = await deleteVariedadAPI(id);
    if (!success) {
      return { error: 'Error al eliminar la variedad' };
    }
    return { success: 'Variedad eliminada exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar la variedad' };
  }
}
