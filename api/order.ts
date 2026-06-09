import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { buildOrderEmailHtml, type OrderEmailCommission } from './lib/orderEmailHtml';

/** Payload esperado desde OrderSection */
interface OrderPayload {
  name: string;
  email: string;
  commissions: OrderEmailCommission[];
  total: number;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Valida una comisión individual del array */
function isValidCommission(value: unknown): value is OrderEmailCommission {
  if (!value || typeof value !== 'object') return false;

  const commission = value as Record<string, unknown>;

  return (
    typeof commission.id === 'string' &&
    commission.id.trim().length > 0 &&
    typeof commission.type === 'string' &&
    commission.type.trim().length > 0 &&
    typeof commission.price === 'number' &&
    Number.isFinite(commission.price) &&
    commission.price >= 0 &&
    typeof commission.specifications === 'string' &&
    commission.specifications.trim().length > 0
  );
}

/** Valida el body completo de la solicitud */
function validatePayload(body: unknown): { valid: true; data: OrderPayload } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'El cuerpo de la solicitud es inválido.' };
  }

  const { name, email, commissions, total } = body as Record<string, unknown>;

  if (typeof name !== 'string' || typeof email !== 'string') {
    return { valid: false, error: 'El nombre y el correo son obligatorios.' };
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();

  if (!trimmedName) {
    return { valid: false, error: 'El nombre es obligatorio.' };
  }

  if (!trimmedEmail) {
    return { valid: false, error: 'El correo es obligatorio.' };
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { valid: false, error: 'El correo electrónico no tiene un formato válido.' };
  }

  if (!Array.isArray(commissions) || commissions.length === 0) {
    return { valid: false, error: 'Debe incluir al menos una comisión.' };
  }

  if (!commissions.every(isValidCommission)) {
    return { valid: false, error: 'Una o más comisiones tienen datos inválidos.' };
  }

  if (typeof total !== 'number' || !Number.isFinite(total) || total < 0) {
    return { valid: false, error: 'El total de la orden no es válido.' };
  }

  const normalizedCommissions = commissions.map((commission) => ({
    id: commission.id.trim(),
    type: commission.type.trim(),
    price: commission.price,
    specifications: commission.specifications.trim(),
  }));

  return {
    valid: true,
    data: {
      name: trimmedName,
      email: trimmedEmail,
      commissions: normalizedCommissions,
      total,
    },
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const validation = validatePayload(req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  const { name, email, commissions, total } = validation.data;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ORDER_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Faltan variables de entorno: RESEND_API_KEY, ORDER_TO_EMAIL o CONTACT_FROM_EMAIL');
    return res.status(500).json({ error: 'Error de configuración del servidor.' });
  }

  const resend = new Resend(apiKey);
  const date = new Date().toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const html = buildOrderEmailHtml({
    name,
    email,
    date,
    total,
    commissions,
  });

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[Nueva Orden] ${name}`,
      html,
    });

    if (error) {
      console.error('Error al enviar orden con Resend:', error);
      return res.status(500).json({ error: 'No fue posible enviar la orden.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error inesperado al enviar orden:', err);
    return res.status(500).json({ error: 'No fue posible enviar la orden.' });
  }
}
