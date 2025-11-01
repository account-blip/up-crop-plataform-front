'use server';


import { unidadInspeccionSchema, UnidadInspeccionSchemaType } from '@/schemas/analisis-de-calidad/unidad-inspeccion.schema';
import { createUnidadInspeccion as createUnidadInspeccionAPI } from '@/services/analisis-de-calidad/unidad-inspeccion.service'



export async function createUnidadInspeccionAction(values: UnidadInspeccionSchemaType) {
  const validatedFields = unidadInspeccionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createUnidadInspeccionAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el unidad' };
    }
    return { success: 'unidad creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el unidad' };
  }
}
