import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

const COLUMNAS = "id, title, description, image, link";

const esTextoNoVacio = (valor) =>
  typeof valor === "string" && valor.trim() !== "";

// Valida el cuerpo de un proyecto. Devuelve un mensaje de error o null.
function validar(body) {
  const { title, description, image, link } = body ?? {};
  if (!esTextoNoVacio(title)) return "El título es obligatorio.";
  if (!esTextoNoVacio(description)) return "La descripción es obligatoria.";
  if (!esTextoNoVacio(image)) return "La URL de la imagen es obligatoria.";
  if (!esTextoNoVacio(link)) return "El link es obligatorio.";
  return null;
}

// Convierte el parámetro :id a entero positivo, o null si no es válido.
function leerId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// GET /api/proyectos
router.get("/", async (_req, res) => {
  const { rows } = await pool.query(
    `select ${COLUMNAS} from proyectos order by id`
  );
  res.json(rows);
});

// POST /api/proyectos
router.post("/", async (req, res) => {
  const error = validar(req.body);
  if (error) return res.status(400).json({ error });

  const { title, description, image, link } = req.body;
  const { rows } = await pool.query(
    `insert into proyectos (title, description, image, link)
     values ($1, $2, $3, $4)
     returning ${COLUMNAS}`,
    [title.trim(), description.trim(), image.trim(), link.trim()]
  );

  res.status(201).json(rows[0]);
});

// PUT /api/proyectos/:id
router.put("/:id", async (req, res) => {
  const id = leerId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Id inválido." });

  const error = validar(req.body);
  if (error) return res.status(400).json({ error });

  const { title, description, image, link } = req.body;
  const { rows } = await pool.query(
    `update proyectos
     set title = $1, description = $2, image = $3, link = $4
     where id = $5
     returning ${COLUMNAS}`,
    [title.trim(), description.trim(), image.trim(), link.trim(), id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Proyecto no encontrado." });
  }
  res.json(rows[0]);
});

// DELETE /api/proyectos/:id
router.delete("/:id", async (req, res) => {
  const id = leerId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Id inválido." });

  const { rowCount } = await pool.query("delete from proyectos where id = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ error: "Proyecto no encontrado." });
  }
  res.status(204).end();
});

export default router;
