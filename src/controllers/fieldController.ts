import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

// Get all fields
export const getFields = async (req: Request, res: Response) => {
    try {
        const fields = await prisma.field.findMany();
        res.json(fields);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch fields" });
    }
};

// Get a single field by ID
export const getFieldById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const field = await prisma.field.findUnique({ where: { fieldCode: id } });
        if (!field) return res.status(404).json({ error: "Field not found" });
        res.json(field);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch field" });
    }
};

// Create a new field
export const createField = async (req: Request, res: Response) => {
    try {

        const { fieldCode, fieldName, fieldLocation, fieldSize, fieldImage01, fieldImage02, staffMembers, cropCode } = req.body;
        const field = await prisma.field.create({
            data: { fieldCode, fieldName, fieldLocation, fieldSize, fieldImage01, fieldImage02,staffMembers, cropCode },
        });
        res.status(201).json(field);
    } catch (error) {
        res.status(500).json({ error: "Failed to create field" });
    }
};

// Update an existing field
export const updateField = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedField = await prisma.field.update({
            where: { fieldCode: id },
            data: req.body,
        });
        res.json(updatedField);
    } catch (error) {
        res.status(500).json({ error: "Failed to update field" });
    }
};

// Delete a field
export const deleteField = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.field.delete({ where: { fieldCode: id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete field" });
    }
};
