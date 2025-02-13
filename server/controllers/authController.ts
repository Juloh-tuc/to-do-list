import type { Request, Response } from "express";

const authController = {
  login: (req: Request, res: Response): void => {
    const { username } = req.body;

    if (!username || typeof username !== "string") {
      res.status(400).json({ error: "Le prénom est requis." });
      return; // 🔥 On arrête la fonction ici pour éviter un `undefined`
    }

    // Simuler une session utilisateur en stockant le prénom
    req.session.user = username.trim();

    res.json({ message: `Bienvenue ${req.session.user} !` });
    return; // 🔥 TypeScript veut s'assurer qu'on ne retourne rien après res.json()
  },
};

export default authController;
