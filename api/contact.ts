import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

/** Payload esperado desde el formulario de contacto */
interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactValidationResult =
  | { valid: true; data: ContactPayload }
  | { valid: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escapa caracteres HTML para evitar inyección en el cuerpo del correo */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Valida que el body contenga todos los campos requeridos con formato correcto */
function validatePayload(body: unknown): ContactValidationResult {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'El cuerpo de la solicitud es inválido.' };
  }

  const { name, email, subject, message } = body as Record<string, unknown>;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string'
  ) {
    return { valid: false, error: 'Todos los campos son obligatorios.' };
  }

  const trimmed = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
    return { valid: false, error: 'Todos los campos son obligatorios.' };
  }

  if (!EMAIL_REGEX.test(trimmed.email)) {
    return { valid: false, error: 'El correo electrónico no tiene un formato válido.' };
  }

  return { valid: true, data: trimmed };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo se aceptan solicitudes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const validation = validatePayload(req.body);

  if (validation.valid === false) {
    return res.status(400).json({ error: validation.error });
  }

  const { name, email, subject, message } = validation.data;

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Faltan variables de entorno: RESEND_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL');
    return res.status(500).json({ error: 'Error de configuración del servidor.' });
  }

  const resend = new Resend(apiKey);
  const fecha = new Date().toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[Nuevo mensaje desde ArtCommissions] ${subject}`,
      html: `
        <p><strong>Nombre:</strong><br />${safeName}</p>
        <p><strong>Correo:</strong><br />${safeEmail}</p>
        <p><strong>Asunto:</strong><br />${safeSubject}</p>
        <p><strong>Mensaje:</strong><br />${safeMessage}</p>
        <p><strong>Fecha:</strong><br />${fecha}</p>
      `,
    });

    if (error) {
      console.error('Error al enviar correo con Resend:', error);
      return res.status(500).json({ error: 'No fue posible enviar el mensaje.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error inesperado al enviar correo:', err);
    return res.status(500).json({ error: 'No fue posible enviar el mensaje.' });
  }
}
