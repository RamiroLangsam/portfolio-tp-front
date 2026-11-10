import "dotenv/config";
import cors from "cors";
import express from "express";
import perfilRouter from "./routes/perfil.js";
import proyectosRouter from "./routes/proyectos.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/perfil", perfilRouter);
app.use("/api/proyectos", proyectosRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

// Cualquier error inesperado (por ejemplo, la base de datos caída).
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor." });
});

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
