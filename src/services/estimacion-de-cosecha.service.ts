import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { EstimacionDeCosecha } from "@/types/estimacion-de-cosecha.type";
import { EstimacionDeCosechaSchemaType, UpdateEstimacionDeCosechaSchemaType } from "@/schemas/estimacion-de-cosecha.schema.type";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getEstimacionesDeCosecha = async (authToken?: string, userId?:string) => {
    try {
      const response = await fetch(`${BASE_URL}/estimaciones-de-cosecha/user/${userId}`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('estimacionesDeCosecha', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<EstimacionDeCosecha>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getEstimacionDeCosechaById = async (estimacionDeCosechaId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/estimaciones-de-cosecha/${estimacionDeCosechaId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as EstimacionDeCosecha;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createEstimacionDeCosecha = async (
    values: EstimacionDeCosechaSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/estimaciones-de-cosecha`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('estimacionesDeCosecha', 'all'));
        return data as EstimacionDeCosecha;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create EstimacionDeCosecha:', error);
      return null;
    }
  };

  export const updateEstimacionDeCosecha = async (
    id: string,
    campo: Partial<UpdateEstimacionDeCosechaSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/estimaciones-de-cosecha/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(campo),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('estimacionesDeCosecha', 'all'));
        return data as EstimacionDeCosecha;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteEstimacionDeCosecha = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/estimaciones-de-cosecha/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('estimacionesDeCosecha', 'all'));
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

