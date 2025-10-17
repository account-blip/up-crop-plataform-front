'use server';

import { EstimacionDeCosechaSchema, EstimacionDeCosechaSchemaType } from "@/schemas/estimacion-de-cosecha.schema.type";
import { createEstimacionDeCosecha as createEstimacionDeCosechaAPI } from '@/services/estimacion-de-cosecha.service'



export async function createEstimacionDeCosechaAction(values: EstimacionDeCosechaSchemaType) {
  const validatedFields = EstimacionDeCosechaSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createEstimacionDeCosechaAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear la Estimacion de cosecha ' };
    }
    return { success: 'Estimacion de cosecha creada exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear la Estimacion de cosecha ' };
  }
}
