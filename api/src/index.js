import "dotenv/config";
import cors from "cors";
import express from "express";
import perfilRouter from "./routes/perfil.js";
import proyectosRouter from "./routes/proyectos.js";
import { pool } from "./db.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/perfil", perfilRouter);
app.use("/api/proyectos", proyectosRouter);
// ---------- Diplomas ----------
const COLUMNAS_DIPLOMA = "id, title, issuer, image, link";

const esTextoNoVacio = (valor) =>
  typeof valor === "string" && valor.trim() !== "";

function validarDiploma(body) {
  const { title, issuer, image, link } = body ?? {};
  if (!esTextoNoVacio(title)) return "El título es obligatorio.";
  if (!esTextoNoVacio(issuer)) return "El lugar de expedición es obligatorio.";
  if (!esTextoNoVacio(image)) return "La URL de la imagen es obligatoria.";
  if (!esTextoNoVacio(link)) return "El link es obligatorio.";
  return null;
}

function leerId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// GET /api/diplomas
app.get("/api/diplomas", async (_req, res) => {
  const { rows } = await pool.query(
    `select ${COLUMNAS_DIPLOMA} from diplomas order by id`
  );
  res.json(rows);
});

// POST /api/diplomas
app.post("/api/diplomas", async (req, res) => {
  const error = validarDiploma(req.body);
  if (error) return res.status(400).json({ error });

  const { title, issuer, image, link } = req.body;
  const { rows } = await pool.query(
    `insert into diplomas (title, issuer, image, link)
     values ($1, $2, $3, $4)
     returning ${COLUMNAS_DIPLOMA}`,
    [title.trim(), issuer.trim(), image.trim(), link.trim()]
  );
  res.status(201).json(rows[0]);
});

// PUT /api/diplomas/:id
app.put("/api/diplomas/:id", async (req, res) => {
  const id = leerId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Id inválido." });

  const error = validarDiploma(req.body);
  if (error) return res.status(400).json({ error });

  const { title, issuer, image, link } = req.body;
  const { rows } = await pool.query(
    `update diplomas
     set title = $1, issuer = $2, image = $3, link = $4
     where id = $5
     returning ${COLUMNAS_DIPLOMA}`,
    [title.trim(), issuer.trim(), image.trim(), link.trim(), id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Diploma no encontrado." });
  }
  res.json(rows[0]);
});

// DELETE /api/diplomas/:id
app.delete("/api/diplomas/:id", async (req, res) => {
  const id = leerId(req.params.id);
  if (id === null) return res.status(400).json({ error: "Id inválido." });

  const { rowCount } = await pool.query("delete from diplomas where id = $1", [
    id,
  ]);

  if (rowCount === 0) {
    return res.status(404).json({ error: "Diploma no encontrado." });
  }
  res.status(204).end();
}); 
app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

// Cualquier error inesperado (por ejemplo, la base de datos caída).
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor." });
});
// En Vercel no hay que escuchar un puerto: la plataforma usa la app exportada.
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
  });
}

export default app;