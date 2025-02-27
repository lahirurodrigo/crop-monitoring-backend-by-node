import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

// Create a new staff
export const createStaff = async (req: Request, res: Response) => {
    try {
        const { staffId, firstName, lastName, designation, gender, joinDate, DOB, address01, address02, address03, address04, address05, contactNo, email, role } = req.body;

        const newStaff = await prisma.staff.create({
            data: {
                staffId,
                firstName,
                lastName,
                designation,
                gender,
                joinDate,
                DOB,
                address01,
                address02,
                address03,
                address04,
                address05,
                contactNo,
                email,
                role,
            },
        });

        res.status(201).json(newStaff);
    } catch (error) {
        res.status(500).json({ error: 'Error creating staff' });
    }
};

// Get all staff
export const getAllStaff = async (req: Request, res: Response) => {
    try {
        const staffMembers = await prisma.staff.findMany();
        res.status(200).json(staffMembers);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching staff members' });
    }
};

// Get a single staff by staffId
export const getStaffById = async (req: Request, res: Response) => {
    try {
        const { staffId } = req.params;
        const staff = await prisma.staff.findUnique({
            where: { staffId },
        });

        if (!staff) {
            res.status(404).json({ error: 'Staff not found' });
            return
        }

        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching staff' });
    }
};

// Update staff details
export const updateStaff = async (req: Request, res: Response) => {
    try {
        const { staffId } = req.params;
        const updatedStaff = await prisma.staff.update({
            where: { staffId },
            data: req.body,
        });

        res.status(200).json(updatedStaff);
    } catch (error) {
        res.status(500).json({ error: 'Error updating staff' });
    }
};

// Delete a staff member
export const deleteStaff = async (req: Request, res: Response) => {
    try {
        const { staffId } = req.params;
        const deletedStaff = await prisma.staff.delete({
            where: { staffId },
        });

        res.status(200).json(deletedStaff);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting staff' });
    }
};
