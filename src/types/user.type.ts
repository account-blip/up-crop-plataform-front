import { Empresa } from "./empresa.type";
import { EstimacionDeCosecha } from "./estimacion-de-cosecha.type";

export const USER_ROLES = ['SUPERADMIN','ADMIN', 'PRODUCTOR', 'INSPECTOR', 'BODEGA'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  empresa: Empresa;
  estimacionesDeCosecha: EstimacionDeCosecha[];
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
