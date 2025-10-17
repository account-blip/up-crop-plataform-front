'use server';

import { UpdateEstimacionDeCosechaSchemaType } from '@/schemas/estimacion-de-cosecha.schema.type';
import { updateEstimacionDeCosecha as updateEstimacionDeCosechaAPI } from '@/services/estimacion-de-cosecha.service'

export async function updateEstimacionDeCosechaAction(
  id: string,
  values: Partial<UpdateEstimacionDeCosechaSchemaType>,    
) {
  try {
    const success = await updateEstimacionDeCosechaAPI(id, values);
    if (!success) {
      return { error: 'Error al editar la Estimacion de cosecha' };
    }
    return { success: 'Estimacion de cosecha editada exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar la Estimacion de cosecha' };
  }
}
