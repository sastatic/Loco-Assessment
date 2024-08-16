const http = require("http");
const app = require("./app"); // Import the app
const config = require("./config/config"); // Configurations (e.g., port, environment)

const port = process.env.PORT || config.port; // Port configuration

// Create the HTTP server
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Process terminated");
  });
});
