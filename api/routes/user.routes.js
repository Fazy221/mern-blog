import express from "express";
import { getUsers, deleteUser, updateUser, createUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/create-user", createUser)
router.delete("/delete-user/:id", deleteUser);
router.put("/update-user/:id", updateUser);
export default router;
