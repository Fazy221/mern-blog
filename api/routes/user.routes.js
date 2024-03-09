import express from "express";
import getUsers from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", getUsers);

export default router;