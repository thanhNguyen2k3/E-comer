import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const { username, email, password } = body;

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify(error.message), { status: 400 });
    }
};
