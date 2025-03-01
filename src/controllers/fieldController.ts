import { Request, Response } from "express";
import {Crop, PrismaClient} from "@prisma/client"
import FieldModel from "../model/FieldModel";

const prisma = new PrismaClient();

// Get all fields
export const getFields = async () => {
    try {
        return await prisma.field.findMany()
    } catch (error) {
        console.error('Error fetching crops:', error);
    }
};

// // Get a single field by ID
// export const getFieldById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const field = await prisma.field.findUnique({ where: { fieldCode: id } });
//         if (!field) {
//             res.status(404).json({ error: "Field not found" });
//             return
//         }
//         res.json(field);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch field" });
//     }
// };



// Create a new field
export const createField = async (field: FieldModel) => {
    try {
        const savedField = await prisma.field.create({data: field});
    } catch (error) {
        console.log(error)
    }
};

export const updateCrop = async (crop: Crop, id: string) => {
    try {
        const updatedCrop = await prisma.crop.update({
            where: { cropCode: id },
            data: crop,
        });
    } catch (error) {
        console.log(error)
    }
};

// Update an existing field
export const updateField = async (field: FieldModel, id: string) => {
    try {
        const updatedField = await prisma.field.update({
            where: { fieldCode: id },
            data: field,
        });
    } catch (error) {
        console.log(error)
    }
};

// Delete a field
export const deleteField = async (id: string) => {
    try {
        await prisma.field.delete({ where: { fieldCode: id } });
    } catch (error) {
        console.log(error)
    }
};
