import express from "express";
import authController from "../controllers/authController";
import taskController from "../controllers/taskController";
import db from "../database/client";
import { validateUsername } from "../middlewares/authMiddleware";

const router = express.Router();

// ✅ Route de debug pour voir les utilisateurs existants (test avec Thunder Client)
router.get("/debug/users", async (req, res) => {
  try {
    const [users] = (await db.query("SELECT * FROM users")) as [
      { id: number; name: string }[],
      unknown[],
    ];
    res.json(users);
  } catch (error) {
    console.error(
      "🔥 Erreur lors de la récupération des utilisateurs :",
      error,
    );
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// ✅ Route pour entrer un prénom (simulé comme un "login")
router.post("/login", validateUsername, authController.login);

// ✅ Routes pour les tâches
router.post("/tasks", taskController.create);
router.get("/tasks/:user", taskController.getAll);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.delete);

export default router;
