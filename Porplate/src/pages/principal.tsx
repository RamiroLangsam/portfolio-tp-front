
import Card from "../components/Card";
import type { Project } from "../data/tipos";

type Props = {
  projects: Project[];
};

export default function Principal({ projects }: Props) {
  return (
    <main className="container">
      <h1>Mi Portfolio</h1>
      <p>Estos son mis proyectos</p>

      {projects.length === 0 ? (
        <p>Todavía no hay proyectos</p>
      ) : (
        <div>
          {projects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}
