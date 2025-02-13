import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="navbar blur-navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">
            <FaHome /> Accueil
          </Link>
        </li>
        {!userName ? (
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              <FaUser /> Connexion
            </Link>
          </li>
        ) : (
          <li className="navbar-item">
            <button
              type="button"
              onClick={handleLogout}
              className="navbar-button"
            >
              <FaSignOutAlt /> Déconnexion
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
