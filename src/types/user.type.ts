import { Campo } from "./campo.type";

export const USER_ROLES = ['ADMIN', 'PRODUCTOR', 'INSPECTOR', 'BODEGA'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  campo: Campo;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
