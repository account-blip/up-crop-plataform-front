import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { Empresa } from "@/types/empresa.type";
import { EmpresaSchemaType, UpdateEmpresaSchemaType } from "@/schemas/empresa.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getEmpresas = async (authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/empresas`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('empresas', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<Empresa>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getEmpresaById = async (empresaId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/empresas/${empresaId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as Empresa;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createEmpresa = async (
    values: EmpresaSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/empresas`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('empresas', 'all'));
        return data as Empresa;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create empresa:', error);
      return null;
    }
  };

  export const updateEmpresa = async (
    id: string,
    empresa: Partial<UpdateEmpresaSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/empresas/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(empresa),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('empresas', 'all'));
        return data as Empresa;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteEmpresa = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/empresas/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('empresas', 'all'));
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

