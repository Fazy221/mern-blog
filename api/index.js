import express from "express";
import cors from "cors";
import dbToConnect from "./config/dbToConnect.js";
import "dotenv/config";
import userRoutes from "./routes/user.routes.js";

// App Setup
const app = express();
app.use(express.json());
app.use(cors());

// Connecting to DB
dbToConnect();

// Routing
app.use("/api/user", userRoutes);
// Listening to port
app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
