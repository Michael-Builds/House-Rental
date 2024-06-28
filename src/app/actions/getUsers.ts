import prisma from "../libs/prismadb"

export default async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return users
    } catch (error: any) {
        console.error("Error fetching users:", error)
        throw new Error(error)
    }
}