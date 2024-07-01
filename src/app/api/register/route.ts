import crypto from 'crypto';
import bcrypt from "bcrypt"
import prisma from "../../libs/prismadb"
import { NextResponse } from "next/server"
import { sendVerificationEmail } from "../../actions/verifyemail"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const verificationToken = crypto.randomBytes(32).toString('hex')

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
                verificationToken
            }
        })

        // await sendVerificationEmail(email, verificationToken, name);

        return NextResponse.json({ message: "User created. Please verify your email." }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
    }
}