'use server';


import { AnalisisDeCalidadSchema, AnalisisDeCalidadSchemaType } from '@/schemas/analisis-de-calidad/analisis-de-calidad.schema';
import { createAnalisisDeCalidad as createAnalisisDeCalidadAPI } from '@/services/analisis-de-calidad/analisis-de-calidad.service'



export async function createAnalisisDeCalidadAction(values: AnalisisDeCalidadSchemaType) {
  const validatedFields = AnalisisDeCalidadSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createAnalisisDeCalidadAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el analisis' };
    }
    return { success: 'analisis creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el analisis' };
  }
}
