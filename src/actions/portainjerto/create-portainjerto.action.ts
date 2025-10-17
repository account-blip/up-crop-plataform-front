'use server';

import { portainjertoSchema, PortainjertoSchemaType } from "@/schemas/portainjerto.schema";
import { createPortainjerto as createPortainjertoAPI } from '@/services/portainjerto.service'



export async function createPortainjertoAction(values: PortainjertoSchemaType) {
  const validatedFields = portainjertoSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createPortainjertoAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el portainjerto' };
    }
    return { success: 'Portainjerto creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el portainjerto' };
  }
}
