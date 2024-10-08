import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb"
import getCurrentUser from "../../../actions/getCurrentUser";

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { reservationId } = params

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid ID")
    }

    // Only creators of a listings or creators of reservations can delete a reservation
    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    })

    return NextResponse.json(reservation)

}