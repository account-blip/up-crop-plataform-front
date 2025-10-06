import { FOOTER_HTML, SHARED_STYLES } from './const';

export const contactTemplate = ({
  name,
  email,
  subject,
  message,
  hostUrl,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  hostUrl: string;
}) => {
  const logoUrl = `${hostUrl}/logo-up-cropin.svg`;

  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #000000;">
    <div style="${SHARED_STYLES.container}">
      <div style="${SHARED_STYLES.header}">
        <img src="${logoUrl}" alt="BetMasters Logo" style="${SHARED_STYLES.logo}" />
        <h1 style="${SHARED_STYLES.title}">Nuevo Mensaje de Contacto: ${subject}</h1>
      </div>
      
      <div style="${SHARED_STYLES.content}">
        <div style="margin-bottom: 30px;">
          <p style="${SHARED_STYLES.text}"><strong>Nombre:</strong> ${name}</p>
          <p style="${SHARED_STYLES.text}"><strong>Email:</strong> ${email}</p>
        </div>

        <div style="background: hsl(224, 71.4%, 8%); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="${SHARED_STYLES.text}"><strong>Mensaje:</strong></p>
          <p style="${SHARED_STYLES.text}">${message}</p>
        </div>
      </div>

      ${FOOTER_HTML}
    </div>
  </body>
  </html>
  `;
};
