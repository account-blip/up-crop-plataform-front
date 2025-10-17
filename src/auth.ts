import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import 'next-auth/jwt';
import { loginSchema } from './schemas/auth/login.schema';
import {
  createUser,
  getUserByEmail,
  getUserById,
} from './services/users.service';
import { loginUser } from './services/auth.service';
import Google from 'next-auth/providers/google';
import { UserRole } from './types/user.type';
import { Campo } from './types/campo.type';


declare module 'next-auth' {
  interface User {
    firstName: string;
    lastName: string;
    accessToken?: string;
    role: UserRole;
    campo: Campo;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: UserRole;
      campo: Campo;
    } & DefaultSession['user'];
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    role?: UserRole;
    campo: Campo;
    exp?: number;
  }
}

export const { unstable_update, auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días en segundos
    updateAge: 24 * 60 * 60, // 24 horas en segundos
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }) as any,
    Credentials({
      credentials: {
        identifier: { label: "Email o Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        if (!credentials) return null

        const validatedFields = loginSchema.safeParse(credentials)
        if (!validatedFields.success) return null

        const { identifier, password } = validatedFields.data

        const user: any = await loginUser(
          { identifier, password },
          process.env.API_SECRET_TOKEN!,
        )

        if (!user || !user.id) return null

        return user
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          // Buscar usuario en tu backend
          const existingUser: any = await getUserByEmail(
            user.email || "",
            process.env.API_SECRET_TOKEN!,
          );
    
          if (!existingUser) {
            const name = user.name?.split(" ") || [];
            const newUser = await createUser(
              {
                email: user.email || "",
                firstName: name[0],
                lastName: name[1] || "",
                role: "ADMIN",
                username:
                  user.email?.split("@")[0] +
                  Math.random().toString(36).substring(2, 15),
              },
              process.env.API_SECRET_TOKEN!,
            );
    
            if (!newUser) return false;
            user.id = newUser.id;
            user.role = newUser.role;
          } else {
            user.id = existingUser.id;
            user.role = existingUser.role;
            user.firstName = existingUser.firstName;
            user.lastName = existingUser.lastName;
            user.campo = existingUser.campo;
          }
          return true;
        }
    
        // Caso credenciales
        if (!user.id) return false;
    
        const existingUser: any = await getUserById(
          user.id,
          process.env.API_SECRET_TOKEN!,
        );
        return !!existingUser;
      } catch (error) {
        console.error("Error en signIn callback:", error);
        return false;
      }
    },
    
    async session({ token, session }) {
      try {
        if (token && token.sub && session.user) {
          session.user = {
            ...session.user,
            id: token.sub,
            email: token.email as string,
            firstName: token.firstName as string,
            lastName: token.lastName as string,
            role: token.role as UserRole,
            campo: token.campo as Campo,
          };
          Object.assign(session, { token: token.accessToken });

        }
        return session;
      } catch (error) {
        console.error('Error en session callback:', error);
        return session;
      }
    },
    async jwt({ token, user, trigger, session }) {
        try {
          if (user) {
            token.sub = user.id;
            token.email = user.email as string;
            token.firstName = user.firstName;
            token.lastName = user.lastName;
            token.role = user.role;
            token.campo = user.campo;
            token.accessToken = user.accessToken || token.accessToken;
          }
      
          if (trigger === 'update') {
            token.username = session.user.username;
            token.firstName = session.user.firstName;
            token.lastName = session.user.lastName;
          }
      
          if (!token.exp || Number(token.exp) < Date.now() / 1000) {
            const existingUser = await getUserById(
              token.sub!,
              process.env.API_SECRET_TOKEN!,
            );
            if (!existingUser) return token;
      
            token.accessToken = jwt.sign(
              {
                id: existingUser.id,
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                role: existingUser.role,
                campo: existingUser.campo,
              },
              process.env.NEXTAUTH_SECRET!,
              { expiresIn: '30d' },
            );
      
            token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
          }

      
          return token;
        } catch (error) {
          console.error('Error en jwt callback:', error);
          return token;
        }
      },
      
  },
}) satisfies ReturnType<typeof NextAuth>;
