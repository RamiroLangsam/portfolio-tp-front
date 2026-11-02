
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Principal from "./pages/principal";
import Admin from "./pages/admin";
import type { Project } from "./data/tipos";
import { perfilInicial, type Perfil } from "./data/perfil";
import "./style/style.css";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [perfil, setPerfil] = useState<Perfil>(() => {
    const guardado = localStorage.getItem("perfil");
    return guardado ? JSON.parse(guardado) : perfilInicial;
  });

  function guardarPerfil(nuevoPerfil: Perfil) {
    setPerfil(nuevoPerfil);
    localStorage.setItem("perfil", JSON.stringify(nuevoPerfil));
  }

  function guardar(project: Project) {
    setProjects((prev) =>
      prev.some((p) => p.id === project.id)
        ? prev.map((p) => p.id === project.id ? project : p)
        : [...prev, project]
    );
  }

  function eliminar(id: number) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Portfolio</Link> | <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Principal projects={projects} perfil={perfil} />}
        />
        <Route
          path="/admin"
          element={
            <Admin
              projects={projects}
              onSave={guardar}
              onDelete={eliminar}
              perfil={perfil}
              onSavePerfil={guardarPerfil}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
