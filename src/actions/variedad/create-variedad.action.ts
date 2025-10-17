'use server';

import { variedadSchema, VariedadSchemaType } from "@/schemas/variedad.schema";
import { createVariedad as createVariedadAPI } from '@/services/variedad.service'



export async function createVariedadAction(values: VariedadSchemaType) {
  const validatedFields = variedadSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createVariedadAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear la variedad' };
    }
    return { success: 'Variedad creada exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear la variedad' };
  }
}
