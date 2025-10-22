'use server';

import { empresaSchema, EmpresaSchemaType } from "@/schemas/empresa.schema";
import { createEmpresa as createEmpresaAPI } from '@/services/empresa.service'



export async function createEmpresaAction(values: EmpresaSchemaType) {
  const validatedFields = empresaSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  try {
    const note = await createEmpresaAPI(validatedFields.data);

    if (!note) {
      return { error: 'Error al crear el empresa' };
    }
    return { success: 'empresa creado exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: 'Error al crear el empresa' };
  }
}
