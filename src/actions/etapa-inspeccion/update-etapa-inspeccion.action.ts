'use server';


import { UpdateEtapaInspeccionSchemaType } from '@/schemas/analisis-de-calidad/etapa-inspeccion.schema';
import { updateEtapaInspeccion as updateEtapaInspeccionAPI } from '@/services/analisis-de-calidad/etapa-inspeccion.service'

export async function updateEtapaInspeccionAction(
  id: string,
  values: Partial<UpdateEtapaInspeccionSchemaType>,
) {
  try {
    const success = await updateEtapaInspeccionAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el etapa' };
    }
    return { success: 'etapa editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el etapa' };
  }
}
