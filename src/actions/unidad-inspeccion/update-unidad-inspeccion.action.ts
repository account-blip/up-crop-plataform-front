'use server';


import { UpdateUnidadInspeccionSchemaType } from '@/schemas/analisis-de-calidad/unidad-inspeccion.schema';
import { updateUnidadInspeccion as updateUnidadInspeccionAPI } from '@/services/analisis-de-calidad/unidad-inspeccion.service'

export async function updateUnidadInspeccionAction(
  id: string,
  values: Partial<UpdateUnidadInspeccionSchemaType>,
) {
  try {
    const success = await updateUnidadInspeccionAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el unidad' };
    }
    return { success: 'unidad editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el unidad' };
  }
}
