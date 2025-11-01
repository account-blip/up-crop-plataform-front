'use server';

import { deleteEtapaInspeccion as deleteEtapaInspeccionAPI } from '@/services/analisis-de-calidad/etapa-inspeccion.service';

export async function deleteEtapaInspeccionAction(id: string) {
  try {
    const success = await deleteEtapaInspeccionAPI(id);
    if (!success) {
      return { error: 'Error al eliminar el etapa' };
    }
    return { success: 'etapa eliminado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar el etapa' };
  }
}
