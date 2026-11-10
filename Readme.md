# Porplate

Una plantilla de portafolio para que cualquiera pueda tener el suyo. Mostrás quién sos y tus proyectos en una página, y los cargás y editás desde un panel de administración, sin tocar el código.

Está hecha con React + TypeScript + Vite (la página), Express (la API) y una base de datos Postgres en Neon o Supabase (donde se guardan tus datos). Se publica gratis en Vercel.

## Cómo funciona

Hay tres piezas que trabajan juntas:

```
Navegador  →  Frontend (Porplate/)  →  API (api/)  →  Base de datos (Neon o Supabase)
```

**El frontend (`Porplate/`)** es la página que ves en el navegador: tu portafolio en `/` y el panel de administración en `/admin`. No guarda nada por sí mismo, le pide los datos a la API.

**La API (`api/`)** es un programa que está en el medio. Recibe los pedidos del frontend ("dame los proyectos", "guardá este proyecto nuevo") y los hace contra la base de datos. El código de la API es **el mismo para todos**: nadie lo modifica.

**La base de datos** es donde quedan guardados tu perfil y tus proyectos. Cada persona tiene la suya, en su cuenta de Neon o Supabase.

### Entonces, ¿qué cambia de una persona a otra?

Solo las **variables de entorno** (*environment variables*). Son valores privados que le pasás a Vercel, como la dirección de tu base de datos. Eso hace que la misma API guarde los datos en tu cuenta y no en la de otra persona. Nunca van escritas en el código ni se suben a GitHub.

## Qué necesitás antes de empezar

- Una cuenta de [GitHub](https://github.com/).
- Una cuenta gratuita en [Neon](https://neon.tech/) o en [Supabase](https://supabase.com/). Cualquiera de las dos sirve, elegí una.
- Una cuenta gratuita en [Vercel](https://vercel.com/) (podés entrar con tu cuenta de GitHub).

## Paso a paso

### 1. Forkeá el repo

Desde GitHub, tocá **Fork** para copiar este repo a tu cuenta.

### 2. Creá tu base de datos

En Neon o Supabase, creá un proyecto nuevo. Ponele el nombre que quieras. Eso te da una base de datos Postgres vacía.

### 3. Creá las tablas con el SQL Editor

La base está vacía: todavía no tiene dónde guardar tus proyectos ni tu perfil. Hay que crear las tablas, y eso se hace corriendo un script SQL.

1. En tu proyecto de Neon o Supabase, abrí el **SQL Editor** (está en el menú lateral).
2. Abrí el archivo [`api/schema.sql`](api/schema.sql) de este repo, copiá todo su contenido y pegalo en el editor.
3. Tocá **Run**.

Con eso se crean dos tablas: `perfil` (tu "Sobre mí") y `proyectos` (los proyectos de tu portafolio). Se hace una sola vez.

### 4. Copiá la dirección de tu base de datos

La API necesita saber a qué base conectarse. Esa dirección se llama *connection string* y se ve parecida a `postgresql://usuario:clave@host/nombre`. Copiala y guardala: la vas a usar en el paso siguiente.

- **Neon**: en el dashboard de tu proyecto, botón **Connect**.
- **Supabase**: botón **Connect** → elegí la opción **Transaction pooler**. Es la que funciona bien desde Vercel.

### 5. Publicá todo en Vercel

Vas a crear **dos proyectos** en Vercel a partir del mismo repo: uno para la API y otro para el frontend. Empezá por la API.

#### 5.1. Publicá la API

1. Entrá a [vercel.com](https://vercel.com/) y tocá **Add New → Project**.
2. Elegí tu fork de este repo y tocá **Import**.
3. En **Root Directory** tocá **Edit** y elegí la carpeta `api`.
4. Abrí la sección **Environment Variables** y agregá esta variable:

   | Name           | Value                                          |
   | -------------- | ---------------------------------------------- |
   | `DATABASE_URL` | la connection string que copiaste en el paso 4 |

5. Tocá **Deploy**.
6. Cuando termine, copiá la dirección que te da Vercel (algo como `https://tu-api.vercel.app`). Para comprobar que anda, abrí esa dirección seguida de `/api/health`. Si ves `{"ok":true}`, la API está funcionando.

#### 5.2. Publicá el frontend

1. Volvé al inicio de Vercel y tocá **Add New → Project** otra vez.
2. Elegí **el mismo repo** y tocá **Import**.
3. En **Root Directory** tocá **Edit** y elegí la carpeta `Porplate`.
4. Abrí **Environment Variables** y agregá:

   | Name           | Value                                                          |
   | -------------- | -------------------------------------------------------------- |
   | `VITE_API_URL` | la dirección de tu API del paso 5.1, **sin** barra al final    |

5. Tocá **Deploy**.
6. Cuando termine, copiá la dirección de tu frontend (algo como `https://tu-portafolio.vercel.app`).

#### 5.3. Permití que el frontend le hable a la API

Por seguridad, la API solo acepta pedidos de la página que vos le indiques. Hay que avisarle cuál es:

1. En Vercel, abrí el proyecto de la **API**.
2. Andá a **Settings → Environment Variables** y agregá:

   | Name          | Value                                                                  |
   | ------------- | ---------------------------------------------------------------------- |
   | `CORS_ORIGIN` | la dirección de tu frontend del paso 5.2, **sin** barra al final       |

3. Andá a **Deployments**, abrí el menú (⋯) del último deploy y tocá **Redeploy**.

> Las variables de entorno se leen cuando se publica el proyecto. Si agregás o cambiás una, tenés que volver a publicar (*Redeploy*) para que tome efecto.

Listo: abrí la dirección de tu frontend y ya tenés tu portafolio en internet.

## Cómo usarlo

1. Entrá a `tu-direccion.vercel.app/admin`.
2. Tocá **Editar Sobre mí** y completá tu nombre, biografía y redes sociales.
3. Tocá **+ Agregar proyecto** y cargá título, descripción, link de una imagen y link del proyecto.
4. Volvé a la página principal y mirá cómo quedó.

## Cosas a tener en cuenta

- **No hay login.** Cualquiera que conozca la dirección de `/admin` puede editar tu portafolio.
- Las imágenes se cargan con un link; no se pueden subir archivos.

## Autores

- Ramiro Langsam — [@RamiroLangsam](https://github.com/RamiroLangsam)
- Leandro Kon — [@leankon](https://github.com/leankon)