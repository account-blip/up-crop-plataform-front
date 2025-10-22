'use server';

import { deleteEmpresa as deleteEmpresaAPI } from '@/services/empresa.service';

export async function deleteEmpresaAction(id: string) {
  try {
    const success = await deleteEmpresaAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el empresa' };
    }
    return { success: 'empresa eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el empresa' };
  }
}
