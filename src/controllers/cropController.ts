import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all crops
export const getCrops = async (req: Request, res: Response) => {
    try {
        const crops = await prisma.crop.findMany();
        res.json(crops);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch crops" });
    }
};

// Get a single crop by ID
export const getCropById = async (req: Request, res: Response) => {
    try {
        const id  = req.params.id;
        const crop = await prisma.crop.findUnique({ where: { cropCode: id } });
        if (!crop) {
            res.status(404).json({ error: "Crop not found" });
            return
        }
        res.json(crop);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch crop" });
    }
};

// Create a new crop
export const createCrop = async (req: Request, res: Response) => {
    try {
        const { cropCode, cropCommonName, cropScientificName, cropImage, cropCategory, cropSeason } = req.body;
        const crop = await prisma.crop.create({
            data: { cropCode, cropCommonName, cropScientificName, cropImage, cropCategory, cropSeason },
        });
        res.status(201).json(crop);
    } catch (error) {
        res.status(500).json({ error: "Failed to create crop" });
    }
};

// Update an existing crop
export const updateCrop = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updatedCrop = await prisma.crop.update({
            where: { cropCode: id },
            data: req.body,
        });
        res.json(updatedCrop);
    } catch (error) {
        res.status(500).json({ error: "Failed to update crop" });
    }
};

// Delete a crop
export const deleteCrop = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await prisma.crop.delete({ where: { cropCode: id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete crop" });
    }
};
