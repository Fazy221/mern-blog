import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbToConnect from "./config/dbToConnect.js";
import "dotenv/config";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

// App Setup
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connecting to DB
dbToConnect();

// Routing
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
// Listening to port
app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
