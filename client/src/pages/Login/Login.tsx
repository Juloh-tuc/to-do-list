import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Veuillez entrer votre prénom !");
      return;
    }

    try {
      const response = await fetch("http://localhost:3310/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) throw new Error("Erreur lors de la connexion");

      localStorage.setItem("userName", username);
      navigate("/home");
    } catch (error) {
      alert("Erreur de connexion !");
    }
  };

  return (
    <div className="login-container">
      <h2>Bienvenue !</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          className="login-input"
          placeholder="🌸 Entrez votre prénom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit" className="login-button">
          Entrer
        </button>
      </form>
    </div>
  );
};

export default Login;
