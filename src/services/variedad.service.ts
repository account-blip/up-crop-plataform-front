import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { Variedad } from "@/types/variedad.type";
import { UpdateVaridadSchemaType, VariedadSchemaType } from "@/schemas/variedad.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getVariedades = async (authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/variedades`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('variedades', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<Variedad>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getVariedadById = async (variedadId:string, authToken?: string) => {   
    try {
      const response = await fetch(`${BASE_URL}/variedades/${variedadId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as Variedad;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createVariedad = async (
    values: VariedadSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/variedades`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('variedades', 'all'));    
        return data as Variedad;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create variedades:', error);
      return null;
    }
  };

  export const updateVariedad = async (
    id: string,
    variedad: Partial<UpdateVaridadSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/variedades/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(variedad),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('variedades', 'all'));
        return data as Variedad;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteVariedad = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/variedades/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('variedades', 'all'));
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

