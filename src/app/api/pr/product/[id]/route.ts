import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const GET = async ({ params: { id } }: Params) => {
    try {
        const existingProduct = await db.product.findFirst({
            where: {
                id,
            },
            include: {
                category: true,
                options: true,
            },
        });

        if (!existingProduct)
            return new NextResponse(JSON.stringify({ message: 'Không tìm thấy sản phẩm' }), { status: 201 });

        return new NextResponse(JSON.stringify(existingProduct), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify((error as any).message), { status: 400 });
    }
};

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {
    try {
        const body = await req.json();

        const { name, shortDes, description, price, saleOff, categoryId, inStock, images } = body;

        const product = await db.product.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                shortDes,
                price,
                categoryId,
                saleOff,
                inStock,
                images,
            },
        });

        return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify((error as any).message), { status: 400 });
    }
};
