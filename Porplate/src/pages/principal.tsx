
import { useEffect, useState } from "react";
import Card from "../components/Card";
import type { Project } from "../data/tipos";
import { perfilInicial, type Perfil } from "../data/perfil";
import api from "../data/api";

export default function Principal() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [perfil, setPerfil] = useState<Perfil>(perfilInicial);

  useEffect(() => {
    fetch(`${api}/api/proyectos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar proyectos");
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));

    fetch(`${api}/api/perfil`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar perfil");
        return res.json();
      })
      .then((data) => setPerfil(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="container">
      <section className="sobre-mi">
        <h1>{perfil.nombre}</h1>
        <p>{perfil.bio}</p>

        <div className="redes">
          {perfil.redes.github && (
            <a href={perfil.redes.github}>GitHub</a>
          )}
          {perfil.redes.linkedin && (
            <a href={perfil.redes.linkedin}>LinkedIn</a>
          )}
          {perfil.redes.instagram && (
            <a href={perfil.redes.instagram}>Instagram</a>
          )}
        </div>
      </section>

      <h2>Mis proyectos</h2>

      {projects.length === 0 ? (
        <p>Todavía no hay proyectos</p>
      ) : (
        <div className="grid">
          {projects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}
