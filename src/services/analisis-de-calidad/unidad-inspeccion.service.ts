import { getAuthHeaders } from "@/lib/auth";
import { Defecto } from "@/types/analisis-de-calidad/defecto.type";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { getCacheTag } from "../cache-tags";
import { DefectoSchemaType, UpdateDefectoSchemaType } from "@/schemas/analisis-de-calidad/defecto.schema";
import { revalidateTag } from "next/cache";
import { UnidadInspeccion } from "@/types/analisis-de-calidad/unidad-inspeccion.type";
import { UnidadInspeccionSchemaType, UpdateUnidadInspeccionSchemaType } from "@/schemas/analisis-de-calidad/unidad-inspeccion.schema";



const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getUnidadInpeccion = async (authToken?: string, userId?:string) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-inspecciones/user/${userId}`, {
        headers: await getAuthHeaders(authToken),
        next: {
            tags: [getCacheTag('unidadInspeccion', 'all')],
          },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<UnidadInspeccion>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getUnidadInspeccionById = async (unidadInspeccionId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-inspecciones/${unidadInspeccionId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as UnidadInspeccion;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createUnidadInspeccion = async (
    values: UnidadInspeccionSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-inspecciones`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('unidadInspeccion', 'all'));
        return data as UnidadInspeccion;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create UnidadInspeccion:', error);
      return null;
    }
  };

  export const updateUnidadInspeccion = async (
    id: string,
    empresa: Partial<UpdateUnidadInspeccionSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-inspecciones/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(empresa),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('unidadInspeccion', 'all'));
        return data as UnidadInspeccion;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteUnidadInspeccion = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-inspecciones/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('unidadInspeccion', 'all'));
        return data;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

