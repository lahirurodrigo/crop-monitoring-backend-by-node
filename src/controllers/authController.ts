
import { PrismaClient, User } from "@prisma/client";
import UserModel from "../model/UserModel";
import bcrypt from 'bcrypt';
import { log } from "console";

const userClient = new PrismaClient().user;

export const registerUser = async (user:UserModel) => {
    try {
        user.password = await bcrypt.hash(user.password,10);
        await userClient.create({
            data:user
        });

    } catch (e) {
        console.log(e);
    }
};

export const validateUser = async (user: UserModel) => {
    try {
        const foundUser: UserModel | null = await userClient.findUnique({
            where: {
                email: user.email
            }
        });

        if (!foundUser) {
            return false;
        }

        console.log("Password from DB:", foundUser.password); // The stored hash
        console.log("Entered Password:", user.password); // The password you're trying to validate

        const isMatch = await bcrypt.compare(user.password, foundUser.password);

        console.log("Password Match:", isMatch); // This will log the result of bcrypt.compare

        return isMatch;
    } catch (e) {
        console.log(e);
    }
};

