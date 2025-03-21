const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDatabase = require("./utils/dbConnection");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");

dotenv.config();
const server = express();

server.use(express.json());
server.use(
  cors({
    origin: "*",
  })
);
server.use("/api/user", userRoutes);
server.use("/api/notes", notesRoutes);

server.get("/", (_, response) => {
  response.status(200).json({
    success: true,
    message: "Server is up and running.",
  });
});

(async () => {
  try {
    server.listen(8001, () => {
      console.info("[INFO]: Server is running at http://localhost:8001/");
    });
    await connectDatabase();
  } catch (error) {
    console.error("[ERROR]: Error initializing the server: ", error);
  }
})();

module.exports = server;
