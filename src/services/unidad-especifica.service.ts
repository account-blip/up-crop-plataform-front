import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { UnidadProductiva } from "@/types/unidad-productiva.type";
import { UnidadProductivaSchemaType, UpdateUnidadProductivaSchemaType } from "@/schemas/unidad-productiva.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getUnidadesProductivas = async (authToken?: string, userId?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-productivas/user/${userId}`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('unidadesProductivas', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<UnidadProductiva>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getUnidadProductivaById = async (campoEspecificoId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-productivas/${campoEspecificoId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as UnidadProductiva;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createUnidadProductiva = async (
    values: UnidadProductivaSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-productivas`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('unidadesProductivas', 'all'));
        return data as UnidadProductiva;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create unidadesProductivas:', error);
      return null;
    }
  };

  export const updateUnidadaProductiva= async (
    id: string,
    campo: Partial<UpdateUnidadProductivaSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-productivas/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(campo),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('unidadesProductivas', 'all'));
        return data as UnidadProductiva;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteUnidadProductiva = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/unidades-productivas/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('unidadesProductivas', 'all'));
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

