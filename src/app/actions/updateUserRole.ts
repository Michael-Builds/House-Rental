import { Role } from '@prisma/client';
import prisma from '../libs/prismadb';

export default async function updateUserRole(email: string, role: Role) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role },
        });

        return user;
    } catch (error: any) {
        console.error("Error updating user role:", error);
        throw new Error(error.message);
    }
}
