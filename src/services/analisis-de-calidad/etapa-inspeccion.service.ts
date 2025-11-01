import { getAuthHeaders } from "@/lib/auth";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { getCacheTag } from "../cache-tags";
import { revalidateTag } from "next/cache";
import { UnidadInspeccion } from "@/types/analisis-de-calidad/unidad-inspeccion.type";
import { EtapaInspeccion } from "@/types/analisis-de-calidad/etapa-inspeccion.type";
import { EtapaInspeccionSchemaType, UpdateEtapaInspeccionSchemaType } from "@/schemas/analisis-de-calidad/etapa-inspeccion.schema";



const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getEtapaInpeccion = async (authToken?: string, userId?:string) => {
    try {
      const response = await fetch(`${BASE_URL}/etapas-inspecciones/user/${userId}`, {
        headers: await getAuthHeaders(authToken),
        next: {
            tags: [getCacheTag('etapaInspeccion', 'all')],
          },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<EtapaInspeccion>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getEtapaInspeccionById = async (etapaInspeccionId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/etapas-inspecciones/${etapaInspeccionId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as EtapaInspeccion;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createEtapaInspeccion = async (
    values: EtapaInspeccionSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/etapas-inspecciones`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('etapaInspeccion', 'all'));
        return data as EtapaInspeccion;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create EtapaInspeccion:', error);
      return null;
    }
  };

  export const updateEtapaInspeccion = async (
    id: string,
    empresa: Partial<UpdateEtapaInspeccionSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/etapas-inspecciones/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(empresa),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('etapaInspeccion', 'all'));
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
  
  export const deleteEtapaInspeccion = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/etapas-inspecciones/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('etapaInspeccion', 'all'));
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

