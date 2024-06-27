import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import getCurrentUser from "../../actions/getCurrentUser";

export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();
    const {
        title,
        description,
        price,
        imageSrc,
        bathroomCount,
        roomCount,
        guestCount,
        location,
        category
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error()
        }
    })

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            price: parseInt(price, 10),
            imageSrc,
            bathroomCount,
            roomCount,
            guestCount,
            locationValue: location.value,
            category,
            userId: currentUser.id,
        }
    });

    return NextResponse.json(listing);
}