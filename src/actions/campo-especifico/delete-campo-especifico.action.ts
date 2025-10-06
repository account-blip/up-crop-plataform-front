'use server';

import { deleteCampoEspecifico as deleteCampoEspecificoAPI } from '@/services/campo-especifico.service';

export async function deleteCampoEspecificoAction(id: string) {
  try {
    const success = await deleteCampoEspecificoAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el campo Especifico'};
    }
    return { success: 'Campo Especifico eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el campo Especifico' };
  }
}
