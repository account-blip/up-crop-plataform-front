import { FOOTER_HTML, SHARED_STYLES } from './const';

export const verificationRejectedTemplate = ({
  hostUrl,
}: {
  hostUrl: string;
}) => {
  const verifyLink = `${hostUrl}/auth/verify`;
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
        <img src="${logoUrl}" alt="up-cropin" style="${SHARED_STYLES.logo}" />
        <h1 style="${SHARED_STYLES.title}">Verificación Rechazada</h1>
      </div>
      
      <div style="${SHARED_STYLES.content}">
        <p style="${SHARED_STYLES.text}">Lo sentimos, pero tu verificación ha sido rechazada. Por favor, asegúrate de que los documentos proporcionados sean claros y válidos.</p>
        
        <div style="text-align: center;">
          <a href="${verifyLink}" style="${SHARED_STYLES.button}">
            Intentar Nuevamente
          </a>
        </div>

        <p style="${SHARED_STYLES.note}">Si crees que esto es un error o necesitas ayuda, por favor contáctanos.</p>
      </div>

      ${FOOTER_HTML}
    </div>
  </body>
  </html>
  `;
};
