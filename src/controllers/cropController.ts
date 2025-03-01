import express, { Request, Response } from "express";
import {Crop, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

// // Get all crops
// export const getCrops = async (req: express.Request, res: express.Response) => {
//     try {
//         const crops = await prisma.crop.findMany();
//         res.json(crops);
//     } catch (error) {
//         res.status(500);
//     }
// };

// // Get a single crop by ID
// export const getCropById = async (req: express.Request, res: express.Response) => {
//     try {
//         const id  = req.params.id;
//         const crop = await prisma.crop.findUnique({ where: { cropCode: id } });
//         res.json(crop);
//     } catch (error) {
//         res.status(500).json();
//     }
// };

// Create a new crop
export const createCrop = async (crop: Crop) => {
    try {
        const savedCrop = await prisma.crop.create({data: crop});
    } catch (error) {
        console.log(error);
    }
};

// Update an existing crop
export const updateCrop = async (crop: Crop, id: string) => {
    try {
        const updatedCrop = await prisma.crop.update({
            where: { cropCode: id },
            data: crop,
        });
    } catch (error) {
    }
};

// Delete a crop
// export const deleteCrop = async (req: express.Request, res: express.Response) => {
//     try {
//         const id = req.params.id;
//         await prisma.crop.delete({ where: { cropCode: id } });
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json();
//     }
// };
