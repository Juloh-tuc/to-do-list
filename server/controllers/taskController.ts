import type { Request, RequestHandler, Response } from "express";
import type { FieldPacket, RowDataPacket } from "mysql2";
import db from "../database/client";

const taskController = {
  // ✅ Création d'une tâche
  create: (async (req: Request, res: Response) => {
    try {
      const { title, user, status } = req.body;

      if (!title || !user || !status) {
        return res.status(400).json({ error: "Données manquantes." });
      }

      // Vérifier si l'utilisateur existe
      const [userExists]: [RowDataPacket[], FieldPacket[]] = await db.query(
        "SELECT id FROM users WHERE name = ?",
        [user],
      );

      if (!Array.isArray(userExists) || userExists.length === 0) {
        return res.status(404).json({ error: "Utilisateur introuvable." });
      }

      // Insertion de la tâche dans la base de données
      await db.query(
        "INSERT INTO tasks (title, status, user_id) VALUES (?, ?, ?)",
        [title, status, userExists[0].id],
      );

      res.status(201).json({ message: "Tâche ajoutée avec succès !" });
    } catch (error) {
      console.error("🔥 Erreur lors de l'ajout de la tâche :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  }) as RequestHandler,

  // ✅ Récupération des tâches d'un utilisateur
  getAll: (async (req: Request, res: Response) => {
    try {
      const { user } = req.params;

      // Vérifier si l'utilisateur existe
      const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(
        "SELECT id FROM users WHERE name = ?",
        [user],
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return res.status(404).json({ error: "Utilisateur introuvable." });
      }

      // Récupérer les tâches de l'utilisateur
      const [tasks]: [RowDataPacket[], FieldPacket[]] = await db.query(
        "SELECT id, title, status FROM tasks WHERE user_id = ?",
        [rows[0].id],
      );

      res.json(tasks);
    } catch (error) {
      console.error("🔥 Erreur lors de la récupération des tâches :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  }) as RequestHandler,

  // ✅ Mise à jour d'une tâche
  update: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Vérifier si la tâche existe
      const [taskExists]: [RowDataPacket[], FieldPacket[]] = await db.query(
        "SELECT id FROM tasks WHERE id = ?",
        [id],
      );

      if (!Array.isArray(taskExists) || taskExists.length === 0) {
        return res.status(404).json({ error: "Tâche introuvable." });
      }

      await db.query("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);

      res.json({ message: "Tâche mise à jour avec succès !" });
    } catch (error) {
      console.error("🔥 Erreur lors de la mise à jour de la tâche :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  }) as RequestHandler,

  // ✅ Suppression d'une tâche
  delete: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Vérifier si la tâche existe
      const [taskExists]: [RowDataPacket[], FieldPacket[]] = await db.query(
        "SELECT id FROM tasks WHERE id = ?",
        [id],
      );

      if (!Array.isArray(taskExists) || taskExists.length === 0) {
        return res.status(404).json({ error: "Tâche introuvable." });
      }

      await db.query("DELETE FROM tasks WHERE id = ?", [id]);

      res.json({ message: "Tâche supprimée avec succès !" });
    } catch (error) {
      console.error("🔥 Erreur lors de la suppression de la tâche :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  }) as RequestHandler,
};

export default taskController;
