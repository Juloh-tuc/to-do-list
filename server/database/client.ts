import dotenv from "dotenv";
import mysql from "mysql2/promise";

// Charger les variables d'environnement
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Vérification des variables d'environnement
if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  throw new Error("❌ Erreur: Des variables d'environnement sont manquantes !");
}

// Création du pool de connexions
const client = mysql.createPool({
  host: DB_HOST,
  port: Number.parseInt(DB_PORT as string),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// Test de connexion
client
  .getConnection()
  .then(() => console.log("✅ Connexion à la base de données réussie !"))
  .catch((err) => {
    console.error("❌ Erreur de connexion à la base de données:", err);
    process.exit(1); // Stoppe l'application en cas d'erreur critique
  });

export default client;

// Types export
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

type DatabaseClient = Pool;
type Result = ResultSetHeader;
type Rows = RowDataPacket[];

export type { DatabaseClient, Result, Rows };
