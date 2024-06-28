import { NextResponse } from 'next/server';
import getUsers from '../../actions/getUsers'
import updateUserRole from '../../actions/updateUserRole';
import { Role } from '@prisma/client';

export async function GET() {
    try {
        const users = await getUsers();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { email, role } = await req.json();

        if (!Object.values(Role).includes(role as Role)) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        await updateUserRole(email, role);
        return NextResponse.json({ message: 'Role updated successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
    }
}