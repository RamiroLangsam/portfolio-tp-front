
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
            <footer className="footer">
        {perfil.redes.github && (
          <a
            href={perfil.redes.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPs4aLjB6PrVFbGobXz0h7wluc7p07sCyaPnyTHvWSA&s=10"
              alt="GitHub"
              referrerPolicy="no-referrer"
            />
          </a>
        )}
        {perfil.redes.linkedin && (
          <a
            href={perfil.redes.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img
              src="https://img.magnific.com/vector-premium/icono-logo-linkedin-redes-profesionales_678821-855.jpg?semt=ais_hybrid&w=740&q=80"
              alt="LinkedIn"
              referrerPolicy="no-referrer"
            />
          </a>
        )}
        {perfil.redes.instagram && (
          <a href={`mailto:${perfil.redes.instagram}`} aria-label="Enviar mail">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTygXllgg_6dwYAOhu6E6XtGlmTb-yJ9u8YX1Hme6vf0g&s=10"
              alt="Mail"
              referrerPolicy="no-referrer"
            />
          </a>
        )}
      </footer>
    </main>
  );
}
