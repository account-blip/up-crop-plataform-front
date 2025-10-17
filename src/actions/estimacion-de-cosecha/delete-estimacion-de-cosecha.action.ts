'use server';

import { deleteEstimacionDeCosecha as deleteEstimacionDeCosechaAPI } from '@/services/estimacion-de-cosecha.service';

export async function deleteEstimacionDeCosechaAction(id: string) {    
  try {
    const success = await deleteEstimacionDeCosechaAPI(id);
    if (!success) {
      return { error: 'Error al eliminar la Estimacion de cosecha ' };
    }
    return { success: 'Estimacion de cosecha eliminada exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al eliminar la Estimacion de cosecha ' };
  }
}
