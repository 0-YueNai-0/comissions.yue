/** Comisión validada recibida en la API de órdenes */
export interface OrderEmailCommission {
  id: string;
  type: string;
  price: number;
  specifications: string;
}

/** Datos necesarios para renderizar el correo de una orden */
export interface OrderEmailData {
  name: string;
  email: string;
  date: string;
  total: number;
  commissions: OrderEmailCommission[];
}

/** Escapa caracteres HTML para evitar inyección en el cuerpo del correo */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Convierte saltos de línea en <br /> preservando el escape previo */
function formatMultiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, '<br />');
}

/** Genera filas HTML para la tabla de comisiones */
function buildCommissionRows(commissions: OrderEmailCommission[]): string {
  return commissions
    .map(
      (commission, index) => `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 14px;">
            ${index + 1}
          </td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; font-weight: 600;">
            ${escapeHtml(commission.type)}
          </td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #059669; font-size: 14px; font-weight: 700; text-align: right; white-space: nowrap;">
            $${commission.price.toFixed(2)}
          </td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; font-size: 14px; line-height: 1.5;">
            ${formatMultiline(commission.specifications)}
          </td>
        </tr>
      `,
    )
    .join('');
}

/**
 * Construye el HTML del correo de nueva orden con diseño profesional
 * compatible con clientes de correo (tablas inline y estilos embebidos).
 */
export function buildOrderEmailHtml(data: OrderEmailData): string {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeDate = escapeHtml(data.date);
  const safeTotal = data.total.toFixed(2);

  return `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nueva Orden — ArtCommissions</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 28px 32px;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">
                  Nueva Orden de Comisión
                </h1>
                <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                  ArtCommissions
                </p>
              </td>
            </tr>

            <!-- Client info -->
            <tr>
              <td style="padding: 32px 32px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 12px;">
                  <tr>
                    <td style="padding: 20px 24px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <p style="margin: 0 0 4px; color: #9d174d; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Cliente</p>
                            <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 600;">${safeName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <p style="margin: 0 0 4px; color: #9d174d; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Correo</p>
                            <p style="margin: 0;">
                              <a href="mailto:${safeEmail}" style="color: #db2777; font-size: 15px; text-decoration: none;">${safeEmail}</a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 12px;">
                            <p style="margin: 0 0 4px; color: #9d174d; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Fecha</p>
                            <p style="margin: 0; color: #374151; font-size: 15px;">${safeDate}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p style="margin: 0 0 4px; color: #9d174d; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">Total</p>
                            <p style="margin: 0; color: #059669; font-size: 22px; font-weight: 800;">$${safeTotal} USD</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Commissions table -->
            <tr>
              <td style="padding: 0 32px 32px;">
                <h2 style="margin: 0 0 16px; color: #111827; font-size: 16px; font-weight: 700;">
                  Detalle de comisiones
                </h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #fef3c7;">
                      <th style="padding: 12px 16px; text-align: left; color: #92400e; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 2px solid #fde68a; width: 48px;">No.</th>
                      <th style="padding: 12px 16px; text-align: left; color: #92400e; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 2px solid #fde68a;">Tipo</th>
                      <th style="padding: 12px 16px; text-align: right; color: #92400e; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 2px solid #fde68a; width: 80px;">Precio</th>
                      <th style="padding: 12px 16px; text-align: left; color: #92400e; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 2px solid #fde68a;">Especificaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${buildCommissionRows(data.commissions)}
                  </tbody>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 32px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center; line-height: 1.5;">
                  Este correo fue generado automáticamente desde el formulario de órdenes de ArtCommissions.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}
