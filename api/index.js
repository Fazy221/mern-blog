import express from "express";
import cors from "cors";
import dbToConnect from "./config/dbToConnect.js"
import 'dotenv/config'

// App Setup
const app = express();
app.use(express.json());
app.use(cors());

// Connecting to DB
dbToConnect();
// Listening to port
app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
