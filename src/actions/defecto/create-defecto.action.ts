'use server';


import { DefectoSchema, DefectoSchemaType } from '@/schemas/analisis-de-calidad/defecto.schema';
import { createDefecto as createDefectoAPI } from '@/services/analisis-de-calidad/defecto.service'



export async function createDefectoAction(values: DefectoSchemaType) {
  const validatedFields = DefectoSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createDefectoAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el defecto' };
    }
    return { success: 'defecto creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el defecto' };
  }
}
