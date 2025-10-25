import { getAuthHeaders } from "@/lib/auth";
import { Defecto } from "@/types/analisis-de-calidad/defecto.type";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { getCacheTag } from "../cache-tags";
import { DefectoSchemaType, UpdateDefectoSchemaType } from "@/schemas/analisis-de-calidad/defecto.schema";
import { revalidateTag } from "next/cache";



const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getDefectos = async (authToken?: string, userId?:string) => {
    try {
      const response = await fetch(`${BASE_URL}/defectos/user/${userId}`, {
        headers: await getAuthHeaders(authToken),
        next: {
            tags: [getCacheTag('defectos', 'all')],
          },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<Defecto>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getDefectoById = async (empresaId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/defectos/${empresaId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as Defecto;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createDefecto = async (
    values: DefectoSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/defectos`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('defectos', 'all'));
        return data as Defecto;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create defecto:', error);
      return null;
    }
  };

  export const updateDefecto = async (
    id: string,
    empresa: Partial<UpdateDefectoSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/defectos/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(empresa),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('defectos', 'all'));
        return data as Defecto;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteDefecto = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/defectos/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('defectos', 'all'));
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

