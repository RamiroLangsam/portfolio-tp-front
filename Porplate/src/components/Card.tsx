
import type { Project } from "../data/tipos";

type CardProps = {
  project: Project;
};

export default function Card({ project }: CardProps) {
  return (
    <div className="card">
      <img src={project.image} alt={project.title} />
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        Ver proyecto
      </a>
    </div>
  );
}
