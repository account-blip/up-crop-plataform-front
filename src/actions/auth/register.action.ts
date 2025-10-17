'use server';

import { sendVerificationEmail } from '@/lib/email';
import {
  registerSchema,
  RegisterSchemaType,
} from '@/schemas/auth/register.schema';
import { generateVerificationToken } from '@/services/auth.service';
import { createUser, getUserByEmail, getUserByUsername } from '@/services/users.service';


export async function registerAction({
  values,
  isVerified,
}: {
  values: RegisterSchemaType;
  isVerified: boolean;
}) {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      console.log(validatedFields.error);
      return { error: 'Invalid fields' };
    }

    const { email, username, firstName, lastName, password, role, campoId } =
      validatedFields.data;

    const existingUser = await getUserByEmail(
      email,
      process.env.API_SECRET_TOKEN!,
    );

    if (existingUser) {
      return { error: 'El email ya está en uso' };
    }

    const existingUserByUserName = await getUserByUsername(
      username,
      process.env.API_SECRET_TOKEN!,
    );

    if (existingUserByUserName) {
      return { error: 'El Nombre de usuario ya está en uso' };
    }

    const userData = {
      firstName,
      lastName,
      username,
      email,
      campoId,
      password,
      emailVerified: isVerified ? new Date().toISOString() : undefined,
      role
    };

    const user = await createUser(userData, process.env.API_SECRET_TOKEN!);

    if (!user) {
      return { error: 'Error al crear usuario' };
    }

    const verificationToken = await generateVerificationToken(
      email,
      process.env.API_SECRET_TOKEN!,
    );

    if (!verificationToken) {
      return { error: 'No se pudo enviar el email de confirmación' };
    }

    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
    });

    return {
      success: 'Email de confirmación enviado. Revisa tu bandeja de entrada.',
      redirectTo: '/auth/login',
    };
  } catch (error) {
    console.error(error);
    return { error: 'Error al registrar usuario' };
  }
}
