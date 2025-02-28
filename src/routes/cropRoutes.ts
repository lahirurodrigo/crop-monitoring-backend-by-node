import express from "express";
import { getCrops, getCropById, createCrop, updateCrop, deleteCrop } from "../controllers/cropController";

const router = express.Router();

router.get("/", getCrops);
router.get("/:id", getCropById);
router.post("/", createCrop);
router.put("/:id", updateCrop);
router.delete("/:id", deleteCrop);

export default router;