
import { useState } from "react";
import type { Project } from "../data/tipos";
import PopUp from "../components/popup";

type Props = {
  projects: Project[];
  onSave: (project: Project) => void;
  onDelete: (id: number) => void;
};

export default function Admin({ projects, onSave, onDelete }: Props) {
  const [mostrar, setMostrar] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Project | null>(null);

  function abrir(project: Project | null) {
    setSeleccionado(project);
    setMostrar(true);
  }

  return (
    <main>
      <h1>Administrador de proyectos</h1>

      <button onClick={() => abrir(null)}>
        Agregar proyecto
      </button>

      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.title}</h2>
          <button onClick={() => abrir(project)}>Editar</button>
          <button onClick={() => onDelete(project.id)}>Eliminar</button>
        </div>
      ))}

      {projects.length === 0 && <p>No hay proyectos.</p>}

      {mostrar && (
        <PopUp
          project={seleccionado}
          onSave={(project) => {
            onSave(project);
            setMostrar(false);
          }}
          onClose={() => setMostrar(false)}
        />
      )}
    </main>
  );
}
