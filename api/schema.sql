-- Porplate: tablas del portafolio.
-- Pegá este script en el SQL Editor de Neon o de Supabase y ejecutalo.

-- Perfil ("Sobre mí"): una sola fila (id = 1).
create table if not exists perfil (
  id        integer primary key default 1 check (id = 1),
  nombre    text not null default 'Tu nombre',
  bio       text not null default 'Soy desarrollador web y estos son mis proyectos.',
  github    text not null default '',
  linkedin  text not null default '',
  instagram text not null default ''
);

insert into perfil (id) values (1) on conflict (id) do nothing;

-- Proyectos del portafolio.
create table if not exists proyectos (
  id          serial primary key,
  title       text not null,
  description text not null,
  image       text not null,
  link        text not null,
  created_at  timestamptz not null default now()
);

-- Seguridad (importante en Supabase):
-- Supabase expone por defecto las tablas del schema "public" mediante su API REST.
-- Esta plantilla se conecta directo a Postgres con DATABASE_URL, así que no la usa.
-- Activar RLS sin políticas cierra esa puerta; la conexión de la API no se ve afectada.
-- En Neon no hace ningún daño.
alter table perfil    enable row level security;
alter table proyectos enable row level security;
