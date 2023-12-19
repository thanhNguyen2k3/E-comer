import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        const { username, password } = body;

        const admin = await db.admin.findFirst({
            where: {
                username,
                password,
            },
        });

        if (!admin) {
            return NextResponse.json({ message: 'Thông tin đăng nhập không hợp lệ' }, { status: 403 });
        }

        return NextResponse.json({ message: 'Đăng nhập thành công' }, { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify(error.message), { status: 400 });
    }
};
