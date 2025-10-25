import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "../cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { AnalisisDeCalidad } from "@/types/analisis-de-calidad/analisis-de-calidad.type";
import { AnalisisDeCalidadSchemaType, UpdateAnalisisDeCalidadSchemaType } from "@/schemas/analisis-de-calidad/analisis-de-calidad.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/* ========================================
   📥 GET ALL (por usuario con paginación)
======================================== */
export const getAnalisisDeCalidad = async (authToken?: string, userId?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/analisis-de-calidad/user/${userId}`, {
      headers: await getAuthHeaders(authToken),
      next: {
        tags: [getCacheTag("analisisDeCalidad", "all")],
      },
    });
    const data = await response.json();

    if (response.ok) {
      return data as PaginatedResponse<AnalisisDeCalidad>;
    } else {
      console.error("❌ Error en getAnalisisDeCalidad:", data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en getAnalisisDeCalidad:", error);
    return null;
  }
};

/* ========================================
   📥 GET ONE (por ID)
======================================== */
export const getAnalisisDeCalidadById = async (id: string, authToken?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/analisis-de-calidad/${id}`, {
      headers: await getAuthHeaders(authToken),
    });
    const data = await response.json();

    if (response.ok) {
      return data as AnalisisDeCalidad;
    } else {
      console.error("❌ Error en getAnalisisDeCalidadById:", data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en getAnalisisDeCalidadById:", error);
    return null;
  }
};

/* ========================================
   🆕 CREATE
======================================== */
export const createAnalisisDeCalidad = async (
  values: AnalisisDeCalidadSchemaType,
  authToken?: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/analisis-de-calidad`, {
      method: "POST",
      headers: await getAuthHeaders(authToken),
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      revalidateTag(getCacheTag("analisisDeCalidad", "all"));
      return data as AnalisisDeCalidad;
    } else {
      console.error("❌ Error en createAnalisisDeCalidad:", data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en createAnalisisDeCalidad:", error);
    return null;
  }
};

/* ========================================
   ✍️ UPDATE
======================================== */
export const updateAnalisisDeCalidad = async (
  id: string,
  values: Partial<UpdateAnalisisDeCalidadSchemaType>,
  authToken?: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/analisis-de-calidad/${id}`, {
      method: "PATCH",
      headers: await getAuthHeaders(authToken),
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      revalidateTag(getCacheTag("analisisDeCalidad", "all"));
      return data as AnalisisDeCalidad;
    } else {
      console.error("❌ Error en updateAnalisisDeCalidad:", data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en updateAnalisisDeCalidad:", error);
    return null;
  }
};

/* ========================================
   🗑️ DELETE
======================================== */
export const deleteAnalisisDeCalidad = async (id: string, authToken?: string) => {
  try {
    const response = await fetch(`${BASE_URL}/analisis-de-calidad/${id}`, {
      headers: await getAuthHeaders(authToken),
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      revalidateTag(getCacheTag("analisisDeCalidad", "all"));
      return data;
    } else {
      console.error("❌ Error en deleteAnalisisDeCalidad:", data);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en deleteAnalisisDeCalidad:", error);
    return null;
  }
};
