'use server';

import { UpdateEmpresaSchemaType } from '@/schemas/empresa.schema';
import { updateEmpresa as updateEmpresaAPI } from '@/services/empresa.service'

export async function updateEmpresaAction(
  id: string,
  values: Partial<UpdateEmpresaSchemaType>,
) {
  try {
    const success = await updateEmpresaAPI(id, values);
    if (!success) {
      return { error: 'Error al editar el empresa' };
    }
    return { success: 'empresa editado exitosamente' };
  } catch (error) {
    console.log(error);
    return { error: 'Error al editar el empresa' };
  }
}
