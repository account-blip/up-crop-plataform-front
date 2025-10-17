import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { CampoEspecifico } from "@/types/campo-especifico.type";
import { CampoEspecificoSchemaType, UpdateCampoEspecificoSchemaType } from "@/schemas/campo-especifico.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getCamposEspecificos = async (authToken?: string, userId?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/campos-especificos/user/${userId}`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('camposEspecificos', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<CampoEspecifico>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getCampoEspecificoById = async (campoEspecificoId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/campos-especificos/${campoEspecificoId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as CampoEspecifico;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createCampoEspecifico = async (
    values: CampoEspecificoSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/campos-especificos`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('camposEspecificos', 'all'));
        return data as CampoEspecifico;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create camposEspecificos:', error);
      return null;
    }
  };

  export const updateCampoEspecifico = async (
    id: string,
    campo: Partial<UpdateCampoEspecificoSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/campos-especificos/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(campo),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('camposEspecificos', 'all'));
        return data as CampoEspecifico;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteCampoEspecifico = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/campos-especificos/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('camposEspecificos', 'all'));
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

