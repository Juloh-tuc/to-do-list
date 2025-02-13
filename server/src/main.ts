// Load environment variables from .env file
import "dotenv/config";

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
import "../database/checkConnection";

// Import the Express application from ./app
import app from "./app";

// Get the port from the environment variables
const port = process.env.APP_PORT || 3310;

app.listen(port, () => {
  console.info(`✅ Serveur en écoute sur le port ${port}`);
});
