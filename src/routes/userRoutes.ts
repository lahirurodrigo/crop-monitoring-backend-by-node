import express from "express";
import { getUser, getUsers, createUser, deleteUser, updateUser } from "../controllers/userController";

const router = express.Router();

// Get all users
router.get("/", getUsers);

// Get a single user by ID
router.get("/:id", getUser);

// Create a new user
router.post("/", createUser);

// Update a user by ID
router.put("/:id", updateUser);

// Delete a user by ID
router.delete("/:id", deleteUser);

export default router