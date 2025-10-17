import { getAuthHeaders } from "@/lib/auth";
import { getCacheTag } from "./cache-tags";
import { PaginatedResponse } from "@/types/paginated-response.type";
import { revalidateTag } from "next/cache";
import { Cuartel } from "@/types/cuartel.type";
import { CuartelSchemaType, UpdateCuartelSchemaType } from "@/schemas/cuartel.schema";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const getCuarteles = async (authToken?: string, userId?:string) => {
    try {
      const response = await fetch(`${BASE_URL}/cuarteles/user/${userId}`, {
        headers: await getAuthHeaders(authToken),
        next: {
          tags: [getCacheTag('campos', 'all')],
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as PaginatedResponse<Cuartel>;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export const getCuartelById = async (cuartelId:string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cuarteles/${cuartelId}`, {
        headers: await getAuthHeaders(authToken),
      });
      const data = await response.json();
  
      if (response.ok) {
        return data as Cuartel;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

export const createCuartel = async (
    values: CuartelSchemaType, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/cuarteles`, {
        method: 'POST',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('cuarteles', 'all'));
        return data as Cuartel;
      } else {
        console.error('Error en la respuesta:', data);
        return null;
      }
    } catch (error) {
      console.error('Error en create campos:', error);
      return null;
    }
  };

  export const updateCuartel = async (
    id: string,
    cuartel: Partial<UpdateCuartelSchemaType>, authToken?: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/cuarteles/${id}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(authToken),
        body: JSON.stringify(cuartel),
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('cuarteles', 'all'));
        return data as Cuartel;
      } else {
        console.error(data);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const deleteCuartel = async (id: string, authToken?: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cuarteles/${id}`, {
        headers: await getAuthHeaders(authToken),
        method: 'DELETE',
      });
      const data = await response.json();
  
      if (response.ok) {
        revalidateTag(getCacheTag('cuarteles', 'all'));
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

