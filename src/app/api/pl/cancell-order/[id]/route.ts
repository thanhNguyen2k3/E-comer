import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {
    try {
        const body = await req.json();
        const { status } = body;

        await db.order.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });

        return NextResponse.json({ message: 'Hủy đơn hàng thành công' }, { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify(error.message), { status: 400 });
    }
};
