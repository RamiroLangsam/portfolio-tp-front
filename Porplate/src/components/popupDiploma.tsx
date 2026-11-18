import { useState, type FormEvent } from "react";
import type { Diploma } from "../data/tipos";

type Props = {
  diploma: Diploma | null;
  onSave: (diploma: Diploma) => void;
  onClose: () => void;
};

export default function PopUpDiploma({ diploma, onSave, onClose }: Props) {
  const [title, setTitle] = useState(diploma?.title ?? "");
  const [issuer, setIssuer] = useState(diploma?.issuer ?? "");
  const [image, setImage] = useState(diploma?.image ?? "");
  const [link, setLink] = useState(diploma?.link ?? "");

  function guardar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSave({
      id: diploma?.id ?? Date.now(),
      title,
      issuer,
      image,
      link
    });
  }

  return (
    <div className="overlay">
      <form className="popup" onSubmit={guardar}>
        <h2>{diploma ? "Editar diploma" : "Agregar diploma"}</h2>

        <input
          placeholder="Título del diploma"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Expedido en (institución o competencia)"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          required
        />

        <input
          placeholder="URL de imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <input
          placeholder="Link al lugar o competencia"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />

        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
}