
import { useState, type FormEvent } from "react";
import type { Project } from "../data/tipos";

type Props = {
  project: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
};

export default function PopUp({ project, onSave, onClose }: Props) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [image, setImage] = useState(project?.image ?? "");
  const [link, setLink] = useState(project?.link ?? "");

  function guardar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSave({
      id: project?.id ?? Date.now(),
      title,
      description,
      image,
      link
    });
  }

  return (
    <form onSubmit={guardar}>
      <h2>{project ? "Editar proyecto" : "Agregar proyecto"}</h2>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        placeholder="URL de imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />

      <input
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <button type="submit">Guardar</button>
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
}
