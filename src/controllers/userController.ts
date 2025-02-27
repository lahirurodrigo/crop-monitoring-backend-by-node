import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

// Get all Users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
};

// Get a User by id
export const getUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: { email: id }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};


// Create a User
export const createUser = async (req: Request, res: Response) => {
    try {

        const user = req.body;
        const newUser = await prisma.user.create({
            data: user
        })
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error)
    }
}

// Update a User
export const updateUser = async (req: Request, res: Response) => {
    console.log("Update User Method")
    try {
        const user = req.body;
        const id = req.params.id;
        const updatedUser = await prisma.user.update({
            where: { email: id},
            data: user
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error)
    }
}

// Delete a User
export const deleteUser = async (req: Request, res: Response) => {
    console.log("Delete User Method")
    try {
        const id = req.params.id;
        await prisma.user.delete({
            where: {email: id}
        });
        res.status(200).json({});
    } catch (error) {
        res.status(500).json(error)
    }
}