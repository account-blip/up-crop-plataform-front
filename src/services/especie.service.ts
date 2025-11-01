import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { Empresa } from "@/types/empresa.type";
import { EmpresaSchemaType, UpdateEmpresaSchemaType } from "@/schemas/empresa.schema";
import { Especie } from "@/types/especie.type";
import { EspecieSchemaType, UpdateEspecieSchemaType } from "@/schemas/especie.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getEspecies = async (authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/especies`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('especies', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<Especie>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getEspecieById = async (especieId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/especies/${especieId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as Especie;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createEspecie = async (
    values: EspecieSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/especies`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('especies', 'all'));
        return data as Empresa;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create especies:', error);
      return null;
    }
  };

  export const updateEspecie = async (
    id: string,
    empresa: Partial<UpdateEspecieSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/especies/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(empresa),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('especies', 'all'));
        return data as Especie;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteEspecie = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/especies/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('especies', 'all'));
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

