import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const GET = async ({ params: { id } }: Params) => {
    try {
        const existingCategory = await db.category.findFirst({
            where: {
                id,
            },
        });

        if (!existingCategory) return new NextResponse(JSON.stringify({ message: 'Không có danh mục này' }));

        return new NextResponse(JSON.stringify(existingCategory), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify((error as any).message), { status: 400 });
    }
};

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {
    const body = await req.json();

    if (!id) return new NextResponse(JSON.stringify({ message: 'Không tìm thấy danh mục này' }), { status: 400 });

    try {
        const { name, thumbnail } = body;

        const newCategory = await db.category.update({
            where: {
                id,
            },
            data: {
                name,
                thumbnail,
            },
        });

        return new NextResponse(JSON.stringify(newCategory), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify((error as any).message), { status: 400 });
    }
};
