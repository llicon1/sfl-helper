# Deploy en Vercel

## Proyecto

Esta app es HTML/CSS/JS con APIs Node serverless en `/api`.

## Comandos locales

```bash
npm run check
npm run dev
```

La app local queda en:

```text
http://127.0.0.1:4174/
```

## Vercel

1. Sube la carpeta `sfl-market-app` a GitHub.
2. En Vercel, importa el repositorio.
3. Usa estos valores:

```text
Framework Preset: Other
Build Command: vacío
Output Directory: vacío
Install Command: npm install
```

4. Deploy.

## Supabase

Antes del deploy, abre Supabase y entra en:

```text
SQL Editor -> New query
```

Pega y ejecuta el contenido de:

```text
supabase-schema.sql
```

Luego en Vercel agrega estas variables de entorno:

```text
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_public_key
```

En este proyecto:

```text
SUPABASE_URL=https://gllxxpngojxvzuukmhwm.supabase.co
```

## APIs incluidas

```text
/api/market
/api/flower
/api/farm/:farmId
/api/nfts
/api/community
/api/community/like
/api/community/visit
/api/community/clean
/api/community/delete
```

## Nota importante

Si `SUPABASE_URL` y `SUPABASE_ANON_KEY` existen, Comunidad usa Supabase.

Si no existen, la app usa `community-posts.json` como respaldo local para desarrollo.
