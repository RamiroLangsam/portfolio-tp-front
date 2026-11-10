import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

const perfilPorDefecto = {
  nombre: "Tu nombre",
  bio: "Soy desarrollador web y estos son mis proyectos.",
  redes: { github: "", linkedin: "", instagram: "" },
};

// Convierte una fila de la base al formato que usa el frontend (tipo Perfil).
function aPerfil(fila) {
  return {
    nombre: fila.nombre,
    bio: fila.bio,
    redes: {
      github: fila.github,
      linkedin: fila.linkedin,
      instagram: fila.instagram,
    },
  };
}

const esTexto = (valor) => typeof valor === "string";

// GET /api/perfil
router.get("/", async (_req, res) => {
  const { rows } = await pool.query("select * from perfil where id = 1");
  res.json(rows[0] ? aPerfil(rows[0]) : perfilPorDefecto);
});

// PUT /api/perfil
router.put("/", async (req, res) => {
  const { nombre, bio, redes } = req.body ?? {};

  if (!esTexto(nombre) || nombre.trim() === "") {
    return res.status(400).json({ error: "El nombre es obligatorio." });
  }
  if (!esTexto(bio)) {
    return res.status(400).json({ error: "La biografía debe ser texto." });
  }
  if (
    !redes ||
    !esTexto(redes.github) ||
    !esTexto(redes.linkedin) ||
    !esTexto(redes.instagram)
  ) {
    return res
      .status(400)
      .json({ error: "Las redes (github, linkedin, instagram) deben ser texto." });
  }

  const { rows } = await pool.query(
    `insert into perfil (id, nombre, bio, github, linkedin, instagram)
     values (1, $1, $2, $3, $4, $5)
     on conflict (id) do update set
       nombre = excluded.nombre,
       bio = excluded.bio,
       github = excluded.github,
       linkedin = excluded.linkedin,
       instagram = excluded.instagram
     returning *`,
    [nombre.trim(), bio, redes.github, redes.linkedin, redes.instagram]
  );

  res.json(aPerfil(rows[0]));
});

export default router;
