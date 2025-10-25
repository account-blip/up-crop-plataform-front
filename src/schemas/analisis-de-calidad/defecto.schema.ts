import { z } from "zod";
import { TIPO_DEFECTO } from "../../types/analisis-de-calidad/defecto.type";

export const DefectoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  tipo: z.enum(TIPO_DEFECTO)
});

export type DefectoSchemaType = z.infer<typeof DefectoSchema>;

export const UpdateDefectoSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    tipo: z.enum(TIPO_DEFECTO)
  })
  export type UpdateDefectoSchemaType = z.infer<typeof UpdateDefectoSchema>
  
  // ===============================
  // 🗑️ DELETE
  // ===============================
  export const DeleteDefectoSchema = z.object({
    confirmation: z
      .string()
      .refine((v) => v === "Eliminar Defecto", {
        message: 'Debes escribir: "Eliminar Defecto"',
      }),
  })
  export type DeleteDefectoSchemaType = z.infer<typeof DeleteDefectoSchema>