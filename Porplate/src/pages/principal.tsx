
import Card from "../components/Card";
import type { Project } from "../data/tipos";
import type { Perfil } from "../data/perfil";

type Props = {
  projects: Project[];
  perfil: Perfil;
};

export default function Principal({ projects, perfil }: Props) {
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
