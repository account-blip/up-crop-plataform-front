'use server';


import { etapaInspeccionSchema, EtapaInspeccionSchemaType } from '@/schemas/analisis-de-calidad/etapa-inspeccion.schema';
import { createEtapaInspeccion as createEtapaInspeccionAPI } from '@/services/analisis-de-calidad/etapa-inspeccion.service'



export async function createEtapaInspeccionAction(values: EtapaInspeccionSchemaType) {
  const validatedFields = etapaInspeccionSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createEtapaInspeccionAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el etapa' };
    }
    return { success: 'etapa creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el etapa' };
  }
}
