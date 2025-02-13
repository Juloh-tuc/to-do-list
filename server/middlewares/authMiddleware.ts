import type { NextFunction, Request, Response } from "express";

// Middleware pour valider le prénom et l'assainir
export const validateUsername = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let { username } = req.body;

  if (!username || typeof username !== "string") {
    res.status(400).json({ error: "Un prénom valide est requis." });
    return; // 🔥 Empêche Express d'exécuter `next()` en cas d'erreur
  }

  username = username.trim();

  if (username.length < 2 || username.length > 50) {
    res
      .status(400)
      .json({ error: "Le prénom doit faire entre 2 et 50 caractères." });
    return;
  }

  // Ajouter le prénom nettoyé à `req.body`
  req.body.username = username;
  next(); // 🔥 Si tout est OK, on passe à la suite !
};
