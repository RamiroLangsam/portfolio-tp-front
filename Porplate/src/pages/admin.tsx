
import { useState, type FormEvent } from "react";
import type { Project } from "../data/tipos";
import type { Perfil } from "../data/perfil";
import Card from "../components/Card";
import PopUp from "../components/popup";

type Props = {
  projects: Project[];
  onSave: (project: Project) => void;
  onDelete: (id: number) => void;
  perfil: Perfil;
  onSavePerfil: (perfil: Perfil) => void;
};

export default function Admin({
  projects,
  onSave,
  onDelete,
  perfil,
  onSavePerfil
}: Props) {
  const [mostrar, setMostrar] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Project | null>(null);
  const [datos, setDatos] = useState<Perfil>(perfil);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  function abrir(project: Project | null) {
    setSeleccionado(project);
    setMostrar(true);
  }

  function guardarPerfil(e: FormEvent<HTMLFormElement>) {
    setMostrarPerfil(false);
    e.preventDefault();
    onSavePerfil(datos);
  }

  function cambiarRed(red: keyof Perfil["redes"], valor: string) {
    setDatos((prev) => ({
      ...prev,
      redes: { ...prev.redes, [red]: valor }
    }));
  }

  return (
    <main className="container">
      <h1>Administrador de proyectos</h1>

      <button
  className="primary-btn"
  onClick={() => setMostrarPerfil(!mostrarPerfil)}
>
  {mostrarPerfil ? "Cerrar edición" : "Editar Sobre mí"}
</button>

{mostrarPerfil && (
      <section className="perfil-admin">
        <h2>Editar Sobre mí</h2>

        <form onSubmit={guardarPerfil}>
          <label>Nombre</label>
          <input
            value={datos.nombre}
            onChange={(e) =>
              setDatos({ ...datos, nombre: e.target.value })
            }
            required
          />

          <label>Biografía</label>
          <textarea
            value={datos.bio}
            onChange={(e) =>
              setDatos({ ...datos, bio: e.target.value })
            }
          />

          <label>GitHub</label>
          <input
            value={datos.redes.github}
            onChange={(e) => cambiarRed("github", e.target.value)}
            placeholder="URL de GitHub"
          />
<small>Incluí https:// al principio del enlace.</small>
          <label>LinkedIn</label>
          <input
            value={datos.redes.linkedin}
            onChange={(e) => cambiarRed("linkedin", e.target.value)}
            placeholder="URL de LinkedIn"
          />
          <small>Incluí https:// al principio del enlace.</small>

          <label>Instagram</label>
          <input
            value={datos.redes.instagram}
            onChange={(e) => cambiarRed("instagram", e.target.value)}
            placeholder="URL de Instagram"
          />
<small>Incluí https:// al principio del enlace.</small>
          <button className="primary-btn" type="submit">
            Guardar perfil
          </button>
        </form>
      </section>
)}
      <div className="admin-header">
        <h2>Mis proyectos</h2>
        <button className="primary-btn" onClick={() => abrir(null)}>
          + Agregar proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <p>Todavía no hay proyectos</p>
      ) : (
        <div className="grid">
          {projects.map((project) => (
            <div className="admin-card" key={project.id}>
              <Card project={project} />
              <div className="admin-actions">
                <button onClick={() => abrir(project)}>Editar</button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(project.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
