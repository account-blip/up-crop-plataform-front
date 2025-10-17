import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { Portainjerto } from "@/types/portainjerto.type";
import { PortainjertoSchemaType, UpdatePortainjertoSchemaType } from "@/schemas/portainjerto.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getPortainjertos = async (authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/portainjertos`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('portainjertos', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<Portainjerto>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getPortainjertoById = async (portainjertoId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/portainjertos/${portainjertoId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as Portainjerto;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createPortainjerto = async (
    values: PortainjertoSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/portainjertos`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('portainjertos', 'all'));
        return data as Portainjerto;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create portainjertos:', error);
      return null;
    }
  };

  export const updatePortainjerto = async (    
    id: string,
    portainjerto: Partial<UpdatePortainjertoSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/portainjertos/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(portainjerto),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('portainjertos', 'all'));
        return data as Portainjerto;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deletePortainjerto = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/portainjertos/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('portainjertos', 'all'));
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

