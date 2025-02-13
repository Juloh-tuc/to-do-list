import cors from "cors";
import express from "express";
import session from "express-session";
import router from "./router";

const app = express();

// ✅ CORS pour autoriser le front
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// ✅ Middleware JSON (Obligatoire pour que le backend comprenne les JSON)
app.use(express.json());

// ✅ Middleware pour gérer les sessions
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

// ✅ Monte l’API sous `/api`
app.use("/api", router);

export default app;
