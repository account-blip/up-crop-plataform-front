'use server';

import { unidadProductivaSchema, UnidadProductivaSchemaType } from "@/schemas/unidad-productiva.schema";
import { createUnidadProductiva as createUnidadProductivaAPI } from '@/services/unidad-especifica.service'



export async function createUnidadProductivaAction(values: UnidadProductivaSchemaType) {
  const validatedFields = unidadProductivaSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createUnidadProductivaAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el unidad productiva' };
    }
    return { success: 'unidad productiva creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el unidad productiva' };
  }
}
