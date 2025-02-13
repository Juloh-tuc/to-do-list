import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page non trouvée</h1>
      <p className="not-found-message">Désolé, cette page n'existe pas !</p>
      <Link to="/" className="not-found-link">
        Retour à la page d'accueil
      </Link>
    </div>
  );
}
