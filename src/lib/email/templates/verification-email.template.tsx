import { FOOTER_HTML, SHARED_STYLES } from './const';

export const verificationEmailTemplate = ({
  token,
  hostUrl,
}: {
  token: string;
  hostUrl: string;
}) => {
  const confirmLink = `${hostUrl}/auth/new-verification?token=${token}`;
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
        <h1 style="${SHARED_STYLES.title}">Confirma tu correo electrónico</h1>
      </div>
      
      <div style="${SHARED_STYLES.content}">
        <p style="${SHARED_STYLES.text}">Gracias por registrarte en Up-Crop. Para completar tu registro, haz clic en el botón de abajo para confirmar tu dirección de correo electrónico.</p>
        
        <div style="text-align: center;">
          <a href="${confirmLink}" style="${SHARED_STYLES.button}">
            Confirmar correo electrónico
          </a>
        </div>

        <p style="${SHARED_STYLES.note}">Si no creaste una cuenta con esta dirección de correo electrónico, puedes ignorar este correo.</p>
      </div>

      ${FOOTER_HTML}
    </div>
  </body>
  </html>
  `;
};
