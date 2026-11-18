import type { Diploma } from "../data/tipos";

type CardDiplomaProps = {
  diploma: Diploma;
};

export default function CardDiploma({ diploma }: CardDiplomaProps) {
  return (
    <div className="card">
      <img src={diploma.image} alt={diploma.title} />
      <h2>{diploma.title}</h2>
      <p>Expedido en {diploma.issuer}</p>
      <a href={diploma.link} target="_blank" rel="noopener noreferrer">
        Ver diploma
      </a>
    </div>
  );
}