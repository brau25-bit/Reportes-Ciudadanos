import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

function baseTemplate({ title, preheader, content }) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="x-apple-disable-message-reformatting"/>
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family: Georgia, 'Times New Roman', serif;">

  <!-- Preheader oculto -->
  <span style="display:none; max-height:0; overflow:hidden;">${preheader}</span>

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- BARRA SUPERIOR DE EMERGENCIAS -->
          <tr>
            <td style="background-color:#9b1c2e; padding: 8px 24px; border-radius: 8px 8px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  
                </tr>
              </table>
            </td>
          </tr>

          <!-- HEADER INSTITUCIONAL -->
          <tr>
            <td style="background-color:#ffffff; padding: 20px 24px; border-bottom: 3px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: middle;">
                    <!-- Logo CDMX -->
                    <table cellpadding="0" cellspacing="0" style="display:inline-table;">
                      <tr>
                        <td style="vertical-align: middle;">
                          <div style="
                            width: 48px; height: 48px;
                            background: linear-gradient(135deg, #be123c 0%, #9b1c2e 50%, #831843 100%);
                            border-radius: 8px;
                            display: inline-block;
                            text-align: center;
                            line-height: 48px;
                            font-family: Arial, sans-serif;
                            font-weight: 900;
                            font-size: 13px;
                            color: white;
                            letter-spacing: -0.5px;
                          ">CDMX</div>
                        </td>
                        <td style="vertical-align: middle; padding-left: 10px;">
                          <div style="font-family: Arial, sans-serif; font-size: 10px; color: #64748b; line-height: 1.2;">Gobierno de la</div>
                          <div style="font-family: Arial, sans-serif; font-size: 13px; font-weight: 700; color: #1e293b; line-height: 1.2;">Ciudad de México</div>
                        </td>
                        <td style="padding: 0 20px; vertical-align: middle;">
                          <div style="width: 1px; height: 36px; background-color: #e2e8f0;"></div>
                        </td>
                        <td style="vertical-align: middle;">
                          <!-- Logo Tláhuac -->
                          <div style="
                            width: 48px; height: 48px;
                            background: linear-gradient(135deg, #166534 0%, #15803d 100%);
                            border-radius: 8px;
                            display: inline-block;
                            text-align: center;
                            line-height: 48px;
                            font-family: Arial, sans-serif;
                            font-weight: 900;
                            font-size: 22px;
                            color: white;
                          ">T</div>
                        </td>
                        <td style="vertical-align: middle; padding-left: 10px;">
                          <div style="font-family: Arial, sans-serif; font-size: 14px; font-weight: 700; color: #1e293b; line-height: 1.2;">Tláhuac</div>
                          <div style="font-family: Arial, sans-serif; font-size: 11px; color: #64748b; line-height: 1.2;">Alcaldía</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <div style="font-family: Arial, sans-serif; font-size: 16px; font-weight: 700; color: #1e3a8a; line-height: 1.3;">Sistema de Reportes</div>
                    <div style="font-family: Arial, sans-serif; font-size: 16px; font-weight: 700; color: #1e3a8a; line-height: 1.3;">Ciudadanos</div>
                    <div style="font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8; margin-top: 2px;">Ventanilla Única Digital</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENIDO PRINCIPAL -->
          <tr>
            <td style="background-color:#ffffff; padding: 40px 36px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#1e293b; padding: 28px 36px; border-radius: 0 0 8px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-family: Arial, sans-serif; font-size: 12px; color: #94a3b8; line-height: 1.8;">
                      <strong style="color:#cbd5e1;">Contacto:</strong> contacto@tlahuac.cdmx.gob.mx<br/>
                      <strong style="color:#cbd5e1;">Dirección:</strong> Av. La Turba S/N, Col. Miguel Hidalgo, Tláhuac, CDMX<br/>
                      <strong style="color:#cbd5e1;">Teléfono:</strong> 55 5842 4000
                    </div>
                  </td>
                  <td align="right" style="vertical-align: top;">
                    <div style="font-family: Arial, sans-serif; font-size: 11px; color: #64748b; text-align: right; line-height: 1.8;">
                      Este es un correo automático.<br/>
                      Por favor no responda a este mensaje.<br/>
                      © ${new Date().getFullYear()} Gobierno de la Ciudad de México<br/>
                      Todos los derechos reservados
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

function sectionTitle(text) {
  return `
    <h2 style="
      font-family: Arial, sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #1e3a8a;
      margin: 0 0 8px 0;
      padding: 0;
    ">${text}</h2>
  `;
}

function bodyText(text) {
  return `
    <p style="
      font-family: Arial, sans-serif;
      font-size: 14px;
      color: #475569;
      line-height: 1.7;
      margin: 0 0 16px 0;
    ">${text}</p>
  `;
}

function primaryButton(label, url) {
  return `
    <table cellpadding="0" cellspacing="0" style="margin: 28px 0;">
      <tr>
        <td style="
          background-color: #2563eb;
          border-radius: 6px;
          padding: 0;
        ">
          <a href="${url}" style="
            display: inline-block;
            padding: 14px 36px;
            font-family: Arial, sans-serif;
            font-size: 15px;
            font-weight: 700;
            color: #ffffff;
            text-decoration: none;
            letter-spacing: 0.3px;
          ">${label}</a>
        </td>
      </tr>
    </table>
  `;
}

function infoBox(items) {
  const rows = items.map(item => `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="font-family: Arial, sans-serif; font-size: 13px; color: #64748b;">${item}</span>
      </td>
    </tr>
  `).join('');

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #2563eb;
      border-radius: 6px;
      padding: 16px 20px;
      margin: 20px 0;
    ">
      ${rows}
    </table>
  `;
}

function alertBox(text) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-left: 4px solid #dc2626;
      border-radius: 6px;
      padding: 14px 20px;
      margin: 20px 0;
    ">
      <tr>
        <td>
          <span style="font-family: Arial, sans-serif; font-size: 13px; color: #991b1b;">
            ⚠️ <strong>Aviso de Seguridad:</strong> ${text}
          </span>
        </td>
      </tr>
    </table>
  `;
}

function statusBox({ reportTitle, oldStatus, newStatus }) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="
      background-color: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 4px solid #2563eb;
      border-radius: 6px;
      padding: 20px 24px;
      margin: 24px 0;
    ">
      <tr>
        <td>
          <div style="font-family: Arial, sans-serif; font-size: 13px; color: #64748b; margin-bottom: 4px;">Reporte</div>
          <div style="font-family: Arial, sans-serif; font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 16px;">${reportTitle}</div>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right: 32px;">
                <div style="font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px;">Estado anterior</div>
                <div style="
                  font-family: Arial, sans-serif;
                  font-size: 13px;
                  font-weight: 600;
                  color: #64748b;
                  background-color: #f1f5f9;
                  border: 1px solid #cbd5e1;
                  border-radius: 4px;
                  padding: 4px 12px;
                  display: inline-block;
                ">${oldStatus}</div>
              </td>
              <td style="padding-right: 32px; font-size: 20px; color: #94a3b8; vertical-align: bottom; padding-bottom: 4px;">→</td>
              <td>
                <div style="font-family: Arial, sans-serif; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 4px;">Estado actual</div>
                <div style="
                  font-family: Arial, sans-serif;
                  font-size: 13px;
                  font-weight: 600;
                  color: #1d4ed8;
                  background-color: #dbeafe;
                  border: 1px solid #93c5fd;
                  border-radius: 4px;
                  padding: 4px 12px;
                  display: inline-block;
                ">${newStatus}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

function divider() {
  return `<div style="height:1px; background-color:#e2e8f0; margin: 24px 0;"></div>`;
}

export async function emailService(email, token) {
  const verifyUrl = `${process.env.BACKEND_URL}/api/v1/auth/verify-account?token=${token}`;

  const content = `
    <div style="text-align:center; margin-bottom: 32px;">
      <div style="
        width: 64px; height: 64px;
        background-color: #eff6ff;
        border-radius: 50%;
        margin: 0 auto 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        line-height: 64px;
      ">✉️</div>
      ${sectionTitle('Verifica tu cuenta')}
      <p style="font-family: Arial, sans-serif; font-size: 14px; color: #94a3b8; margin: 0;">
        Un paso más para acceder al sistema
      </p>
    </div>

    ${bodyText('Estimado/a ciudadano/a,')}
    ${bodyText('Se ha registrado una nueva cuenta en el <strong>Sistema de Reportes Ciudadanos</strong> de la Alcaldía Tláhuac. Para activar su cuenta y acceder a los servicios, verifique su correo electrónico:')}

    <div style="text-align:center;">
      ${primaryButton('Verificar mi cuenta', verifyUrl)}
    </div>

    ${infoBox([
      '✔ Este enlace es válido únicamente para esta cuenta',
      '✔ No comparta este enlace con terceros',
      '✔ Si usted no solicitó este registro, puede ignorar este mensaje',
    ])}

    ${divider()}

    ${bodyText('Si el botón no funciona, copie y pegue el siguiente enlace en su navegador:')}
    <p style="
      font-family: monospace;
      font-size: 11px;
      color: #2563eb;
      word-break: break-all;
      background: #f8fafc;
      padding: 10px 14px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    ">${verifyUrl}</p>
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verifica tu cuenta — Sistema de Reportes Ciudadanos',
      html: baseTemplate({
        title: 'Verificación de Cuenta',
        preheader: 'Activa tu cuenta en el Sistema de Reportes Ciudadanos de Tláhuac',
        content,
      }),
    });
    
    return result;
  } catch (error) {
    console.error('Error in emailService (verify):', error);
    throw error;
  }
}

export async function passwordService(email, token) {
  const resetUrl = `${process.env.BACKEND_URL}/api/v1/auth/reset-password?token=${token}`;

  const content = `
    <div style="text-align:center; margin-bottom: 32px;">
      <div style="
        width: 64px; height: 64px;
        background-color: #fef2f2;
        border-radius: 50%;
        margin: 0 auto 16px;
        line-height: 64px;
        font-size: 28px;
      ">🔐</div>
      ${sectionTitle('Recuperación de contraseña')}
      <p style="font-family: Arial, sans-serif; font-size: 14px; color: #94a3b8; margin: 0;">
        Solicitud de restablecimiento recibida
      </p>
    </div>

    ${bodyText('Estimado/a ciudadano/a,')}
    ${bodyText('Hemos recibido una solicitud para restablecer la contraseña de su cuenta en el <strong>Sistema de Reportes Ciudadanos</strong>.')}

    ${alertBox('Si usted no realizó esta solicitud, ignore este mensaje. Su contraseña permanecerá sin cambios.')}

    <div style="text-align:center;">
      ${primaryButton('Restablecer contraseña', resetUrl)}
    </div>

    ${infoBox([
      '⏱ Este enlace es válido por <strong>1 hora</strong>',
      '🔒 Solo puede utilizarse una vez',
      '🔑 Tras restablecer, deberá iniciar sesión nuevamente',
      '🚫 No comparta este enlace con nadie',
    ])}

    ${divider()}

    ${bodyText('Si el botón no funciona, copie y pegue el siguiente enlace en su navegador:')}
    <p style="
      font-family: monospace;
      font-size: 11px;
      color: #2563eb;
      word-break: break-all;
      background: #f8fafc;
      padding: 10px 14px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    ">${resetUrl}</p>

    ${bodyText('Si tiene problemas, contacte al área de soporte técnico en <strong>contacto@tlahuac.cdmx.gob.mx</strong>')}
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Restablece tu contraseña — Sistema de Reportes Ciudadanos',
      html: baseTemplate({
        title: 'Recuperación de Contraseña',
        preheader: 'Solicitud de recuperación de contraseña recibida',
        content,
      }),
    });

    console.log("Contraseña")
    return result;
  } catch (error) {
    console.error('Error in passwordService:', error);
    throw error;
  }
}

export async function notificationService({ email, title, oldStatus, newStatus }) {
    
  const content = `
    <div style="text-align:center; margin-bottom: 32px;">
      <div style="
        width: 64px; height: 64px;
        background-color: #eff6ff;
        border-radius: 50%;
        margin: 0 auto 16px;
        line-height: 64px;
        font-size: 28px;
      ">📋</div>
      ${sectionTitle('Actualización de reporte')}
      <p style="font-family: Arial, sans-serif; font-size: 14px; color: #94a3b8; margin: 0;">
        Su reporte ha sido actualizado
      </p>
    </div>

    ${bodyText('Estimado/a ciudadano/a,')}
    ${bodyText('Le informamos que el estado de su reporte en el <strong>Sistema de Reportes Ciudadanos</strong> de la Alcaldía Tláhuac ha sido actualizado:')}

    ${statusBox({ reportTitle: title, oldStatus, newStatus })}

    ${bodyText('Puede consultar el detalle y seguimiento de su reporte ingresando al sistema con sus credenciales.')}

    ${divider()}

    <p style="
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0;
    ">
      Si tiene alguna duda sobre el estado de su reporte, puede contactarnos en 
      <strong style="color:#2563eb;">contacto@tlahuac.cdmx.gob.mx</strong> 
      o llamar al <strong style="color:#1e293b;">55 5842 4000</strong>.
    </p>
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Reporte actualizado: ${title} — Sistema de Reportes Ciudadanos`,
      html: baseTemplate({
        title: 'Actualización de Reporte',
        preheader: `Tu reporte "${title}" cambió de estado: ${oldStatus} → ${newStatus}`,
        content,
      }),
    });

    console.log("Notificacion")
    return result;
  } catch (error) {
    console.error('Error in notificationService:', error);
    throw error;
  }
}