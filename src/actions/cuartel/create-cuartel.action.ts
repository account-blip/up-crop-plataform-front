'use server';

import { cuartelSchema, CuartelSchemaType } from "@/schemas/cuartel.schema";
import { createCuartel as createCuartelAPI } from '@/services/cuartel.service'



export async function createCuartelAction(values: CuartelSchemaType) {
  const validatedFields = cuartelSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createCuartelAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el cuartel' };
    }
    return { success: 'Cuartel creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el cuartel' };
  }
}
