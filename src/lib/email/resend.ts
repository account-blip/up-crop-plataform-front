import { Resend } from 'resend';
import { passwordResetTemplate, verificationEmailTemplate } from './templates';
import { contactTemplate } from './templates/contact.template';
import { verificationRejectedTemplate } from './templates/verification-rejected.template';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.EMAIL_FROM_ADDRESS as string;

export const sendPasswordResetEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const htmlContent = passwordResetTemplate({
    token,
    hostUrl: `${process.env.NEXT_PUBLIC_HOST_URL}`,
  });
  try {
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Restablece tu contraseña',
      html: htmlContent,
    });
    console.log('sendPasswordResetEmail:', email, response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const sendVerificationEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const htmlContent = verificationEmailTemplate({
    token,
    hostUrl: `${process.env.NEXT_PUBLIC_HOST_URL}`,
  });
  try {
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Confirma tu correo electrónico',
      html: htmlContent,
    });
    console.log('sendVerificationEmail:', email, response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const sendContactEmail = async ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const htmlContent = contactTemplate({
    name,
    email,
    subject,
    message,
    hostUrl: `${process.env.NEXT_PUBLIC_HOST_URL}`,
  });

  try {
    const response = await resend.emails.send({
      from: fromEmail,
      to: fromEmail,
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: htmlContent,
    });
    console.log('sendContactEmail:', email, response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendVerificationRejected = async ({
  email,
}: {
  email: string;
}) => {
  const htmlContent = verificationRejectedTemplate({
    hostUrl: `${process.env.NEXT_PUBLIC_HOST_URL}`,
  });
  try {
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Tu verificacion fue rechazada',
      html: htmlContent,
    });
    console.log('sendVerificationEmail:', email, response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
