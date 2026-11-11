
import { useEffect, useState, type FormEvent } from "react";
import type { Project } from "../data/tipos";
import { perfilInicial, type Perfil } from "../data/perfil";
import Card from "../components/Card";
import PopUp from "../components/popup";
import api from "../data/api";

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [mostrar, setMostrar] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Project | null>(null);
  const [datos, setDatos] = useState<Perfil>(perfilInicial);
  const [mostrarPerfil, setMostrarPerfil] = useState(false);

  // Cargar proyectos y perfil desde la API
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
      .then((data) => setDatos(data))
      .catch((error) => console.error(error));
  }, []);

  function abrir(project: Project | null) {
    setSeleccionado(project);
    setMostrar(true);
  }

  // Crear o editar un proyecto
  async function guardarProyecto(project: Project) {
    try {
      const res = await fetch(
        seleccionado
          ? `${api}/api/proyectos/${seleccionado.id}`
          : `${api}/api/proyectos`,
        {
          method: seleccionado ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(project)
        }
      );

      if (!res.ok) throw new Error("Error al guardar proyecto");

      const proyectoGuardado = await res.json();

      setProjects((prev) =>
        seleccionado
          ? prev.map((p) =>
              p.id === proyectoGuardado.id ? proyectoGuardado : p
            )
          : [...prev, proyectoGuardado]
      );

      setMostrar(false);
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar el proyecto");
    }
  }

  // Eliminar un proyecto
  async function eliminar(id: number) {
    if (!window.confirm("¿Seguro que querés eliminar este proyecto?")) return;

    try {
      const res = await fetch(`${api}/api/proyectos/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Error al eliminar proyecto");

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el proyecto");
    }
  }

  // Guardar los datos del perfil
  async function guardarPerfil(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/api/perfil`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });

      if (!res.ok) throw new Error("Error al guardar perfil");

      const perfilGuardado = await res.json();
      setDatos(perfilGuardado);
      setMostrarPerfil(false);
    } catch (error) {
      console.error(error);
      alert("No se pudo guardar el perfil");
    }
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
                  onClick={() => eliminar(project.id)}
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
          onSave={guardarProyecto}
          onClose={() => setMostrar(false)}
        />
      )}
    </main>
  );
}
