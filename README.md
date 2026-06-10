# Yue Commissions ✨

Sitio web profesional para la recepción de **comisiones de arte digital**, portafolio y contacto con clientes.

Plataforma completa que permite explorar trabajos, solicitar comisiones, enviar mensajes de contacto y gestionar órdenes con notificación por correo electrónico.

> Diseño original basado en [Digital Art Commissions Website (Figma)](https://www.figma.com/design/jozmJvQSOnQWJox4Z7QTR5/Digital-Art-Commissions-Website).

---

## Demo 🌐

**Producción:** [https://comisiones-yue.vercel.app](https://comisiones-yue.vercel.app)

**Repositorio:** [github.com/abalamjimenezcbtis214/comisiones.yue](https://github.com/abalamjimenezcbtis214/comisiones.yue)

---

## Características

### Portfolio 🎨

- Galería de trabajos con imágenes reales importadas desde `src/imports/`
- Modal / lightbox para ampliar imágenes en pantalla completa
- Categorías del portafolio:
  - Portrait
  - Half Body
  - Full Body
  - Fantasy
  - Anime Style
  - Commission Examples

### Contacto 💌

- Formulario de contacto con campos controlados
- Validación de campos obligatorios y formato de correo
- Envío de mensajes mediante **Resend** (`/api/contact`)
- Estados visuales de carga, éxito y error

### Órdenes 📋

- Constructor de órdenes de comisión interactivo
- Agregar múltiples comisiones a una misma orden
- Editar y eliminar comisiones antes de enviar
- Cálculo automático del total
- Validación de datos del cliente
- Envío de orden completa por correo (`/api/order`)

### Redes Sociales 🔗

Enlaces oficiales integrados en Footer, Contact y Gallery:

| Plataforma | Enlace |
|---|---|
| X | [x.com/M_MoonSun_B](https://x.com/M_MoonSun_B/media) |
| Tumblr | [yuenai](https://www.tumblr.com/yuenai?source=share) |
| Instagram | [@_yue.nai_](https://www.instagram.com/_yue.nai_/) |
| TikTok | [@m_moonsun_b](https://www.tiktok.com/@m_moonsun_b) |

---

## Tecnologías 🛠️

| Tecnología | Uso |
|---|---|
| **React** | Interfaz de usuario y componentes |
| **TypeScript** | Tipado estático en frontend y API |
| **Vite** | Bundler y servidor de desarrollo |
| **Tailwind CSS** | Estilos y diseño responsive |
| **Resend** | Envío de correos transaccionales |
| **Vercel** | Hosting, deploy y funciones serverless |

---

## Estructura del Proyecto 📁

```
comisiones/
├── api/
│   ├── contact.ts          # API de formulario de contacto
│   ├── order.ts            # API de órdenes de comisión
│   └── lib/
│       └── orderEmailHtml.ts   # Helper HTML para correos de orden
├── src/
│   ├── app/
│   │   ├── components/     # Secciones y UI (Gallery, Contact, Order…)
│   │   ├── constants/      # Enlaces de redes sociales
│   │   └── types/          # Tipos compartidos (OrderPayload, etc.)
│   ├── imports/            # Imágenes del portafolio y assets
│   └── styles/             # CSS global y tema
├── vercel.json             # Configuración de deploy SPA + API
├── .env.example            # Plantilla de variables de entorno
└── package.json
```

---

## Variables de Entorno 🔐

Copia `.env.example` a `.env.local` para desarrollo local con `vercel dev`.

| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | Clave de API de [Resend](https://resend.com). Autentica el envío de correos desde las funciones serverless. |
| `CONTACT_FROM_EMAIL` | Dirección remitente verificada en Resend (ej. `onboarding@resend.dev` en pruebas o dominio propio en producción). |
| `CONTACT_TO_EMAIL` | Correo que recibe los mensajes del formulario de **Contacto**. |
| `ORDER_TO_EMAIL` | Correo que recibe las **Órdenes** de comisión con el detalle completo. |

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=tu-correo@ejemplo.com
ORDER_TO_EMAIL=tu-correo@ejemplo.com
```

> ⚠️ Nunca subas archivos `.env` o `.env.local` al repositorio. Configura las variables en el panel de **Vercel → Project Settings → Environment Variables**.

---

## Instalación Local 💻

```bash
# Clonar el repositorio
git clone https://github.com/abalamjimenezcbtis214/comisiones.yue.git
cd comisiones.yue

# Instalar dependencias
npm install

# Servidor de desarrollo (solo frontend)
npm run dev
```

Para probar las APIs (`/api/contact` y `/api/order`) en local:

```bash
npm i -g vercel
cp .env.example .env.local
vercel dev
```

---

## Build 🏗️

```bash
npm run build
```

Genera la carpeta `dist/` lista para producción. Vite compila el frontend; las funciones en `api/` son desplegadas automáticamente por Vercel.

---

## Deploy 🚀

El proyecto está configurado para **Vercel**:

1. Conecta el repositorio de GitHub a Vercel.
2. Framework detectado: **Vite**.
3. Output directory: `dist`.
4. Agrega las variables de entorno en el dashboard.
5. Deploy automático en cada push a la rama principal.

Configuración relevante en `vercel.json`:

- Build command: `npm run build`
- Rewrites SPA para rutas del frontend
- Rutas `/api/*` servidas como funciones serverless

---

## Funcionalidades Implementadas ✅

- [x] Portfolio Gallery
- [x] Lightbox / Modal
- [x] Contact Form
- [x] Contact Email Sending
- [x] Order Builder
- [x] Order Email Sending
- [x] Social Media Links
- [x] Responsive Design
- [x] Vercel Deployment

---

## Roadmap 🗺️

### v1.1

- [ ] Adjuntar imágenes de referencia en órdenes
- [ ] Confirmación visual mejorada
- [ ] Estadísticas básicas

### v1.2

- [ ] Supabase
- [ ] Base de datos de órdenes
- [ ] Historial de solicitudes
- [ ] Dashboard administrativo

### v1.3

- [ ] Seguimiento de estado:
  - Pendiente
  - En progreso
  - Finalizado
  - Entregado

### v1.4

- [ ] Autenticación
- [ ] Panel privado para artistas

### v1.5

- [ ] Stripe
- [ ] PayPal
- [ ] Pagos en línea

### v2.0

- [ ] Portal completo de gestión de comisiones
- [ ] Gestión de clientes
- [ ] Historial de pagos
- [ ] Panel administrativo completo

---

## Autor 👩‍🎨

**Yue Nai**

Artista digital — comisiones de ilustración, personajes y arte anime.

---

## Licencia 📄

Uso privado / portafolio artístico.

Todos los derechos de las obras mostradas pertenecen a sus respectivos autores. El código fuente de este repositorio es para fines de portafolio y gestión personal de comisiones.
