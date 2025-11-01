'use server'

import {
  AnalisisDeCalidadSchema,
  AnalisisDeCalidadSchemaType,
} from '@/schemas/analisis-de-calidad/analisis-de-calidad.schema'
import { createAnalisisDeCalidad as createAnalisisDeCalidadAPI } from '@/services/analisis-de-calidad/analisis-de-calidad.service'
import { AnalisisDeCalidad } from '@/types/analisis-de-calidad/analisis-de-calidad.type'

export async function createAnalisisDeCalidadAction(values: AnalisisDeCalidadSchemaType) {
  const validatedFields = AnalisisDeCalidadSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: '❌ Campos inválidos. Revisá los datos del formulario.' }
  }

  try {
    const res = (await createAnalisisDeCalidadAPI(validatedFields.data)) as
      | AnalisisDeCalidad
      | { error: string; statusCode?: number }

    // 🧩 Si viene un error del backend
    if ('error' in res) {
      return { error: res.error }
    }

    // ✅ Si todo sale bien
    return { success: '✅ Análisis creado exitosamente' }
  } catch (error: any) {
    console.error('❌ Error al crear análisis:', error)
    return { error: error?.message || '⚠️ Error inesperado al crear el análisis.' }
  }
}
