import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { Campo } from "@/types/campo.type";
import { CampoSchemaType, UpdateCampoSchemaType } from "@/schemas/campo.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCampos = async (authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/campos`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('campos', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<Campo>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getCampoById = async (campoId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/campos/${campoId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as Campo;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createCampo = async (
    values: CampoSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/campos`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('campos', 'all'));
        return data as Campo;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create campos:', error);
      return null;
    }
  };

  export const updateCampo = async (
    id: string,
    campo: Partial<UpdateCampoSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/campos/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(campo),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('campos', 'all'));
        return data as Campo;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteCampo = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/campos/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('campos', 'all'));
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

