# Sistema de Gestión de Reportes Ciudadanos

## Descripción

El **Sistema de Gestión de Reportes Ciudadanos** es una API REST desarrollada con **Node.js**, **Express** y **Prisma ORM** que permite administrar reportes ciudadanos y diferentes tipos de trámites municipales.

El sistema implementa autenticación mediante JWT, validación de datos, carga de archivos, generación de reportes PDF, envío de correos electrónicos y herramientas para la administración de información por parte del personal autorizado.

---

# Tecnologías utilizadas

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JavaScript (ES Modules)

---

# Dependencias

| Dependencia | Descripción |
|-------------|-------------|
| Express | Framework para la API REST. |
| Prisma | ORM para el acceso a la base de datos. |
| PostgreSQL | Base de datos relacional. |
| JWT | Autenticación mediante tokens. |
| bcrypt | Encriptación de contraseñas. |
| Zod | Validación de datos de entrada. |
| Multer | Carga de archivos. |
| Nodemailer | Envío de correos electrónicos. |
| Resend | Servicio de envío de correos. |
| Puppeteer | Generación de documentos PDF. |
| Chart.js | Creación de gráficas. |
| chartjs-node-canvas | Renderizado de gráficas del lado del servidor. |
| Express Rate Limit | Protección contra abuso de peticiones. |
| Dotenv | Manejo de variables de entorno. |
| CORS | Configuración de políticas de acceso entre dominios. |

---

# Requisitos

Antes de ejecutar el proyecto asegúrese de tener instalado:

- Node.js 20 o superior
- PostgreSQL
- npm

---

# Instalación

Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto

```bash
cd sistemagestionciudadana
```

Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/database"

JWT_SECRET=

RESEND_API_KEY=

EMAIL_USER=
EMAIL_PASSWORD=

PORT=3000
```

Dependiendo de la configuración del proyecto pueden existir variables adicionales.

---

# Configuración de Prisma

Generar el cliente de Prisma

```bash
npm run prisma:generate
```

Ejecutar migraciones

```bash
npm run prisma:migrate
```

Poblar la base de datos

```bash
npm run seed
```

Abrir Prisma Studio

```bash
npm run prisma:studio
```

---

# Ejecutar el proyecto

Modo desarrollo

```bash
npm start
```

La aplicación iniciará por defecto en:

```
http://localhost:3000
```

---

# Estructura general del proyecto

```
.
├── controllers/
├── middlewares/
├── models/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── routes/
├── services/
├── utils/
├── uploads/
├── server.js
├── package.json
└── README.md
```

---

# Funcionalidades

- Autenticación mediante JWT.
- Administración de usuarios.
- Gestión de reportes ciudadanos.
- Gestión de trámites.
- Validación de datos utilizando Zod.
- Carga de archivos mediante Multer.
- Generación de documentos PDF.
- Generación de gráficas para estadísticas.
- Envío de correos electrónicos.
- Protección contra ataques de fuerza bruta mediante Rate Limiting.
- Acceso a la base de datos mediante Prisma ORM.

---

# Scripts disponibles

| Script | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor utilizando Node.js con recarga automática. |
| `npm run prisma:generate` | Genera el cliente de Prisma. |
| `npm run prisma:migrate` | Ejecuta las migraciones de Prisma. |
| `npm run prisma:studio` | Abre Prisma Studio. |
| `npm run seed` | Ejecuta el archivo de datos iniciales. |

---

# Seguridad

El sistema incorpora diferentes mecanismos de seguridad:

- Autenticación mediante JSON Web Tokens (JWT).
- Contraseñas cifradas con bcrypt.
- Validación de solicitudes utilizando Zod.
- Limitación de solicitudes mediante Express Rate Limit.
- Manejo de variables sensibles mediante archivos `.env`.

---

# Licencia

Este proyecto se distribuye bajo la licencia ISC.