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
                extraOption: true,
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

        const {
            name,
            shortDes,
            description,
            price,
            sizes,
            saleOff,
            categoryId,
            extraName,
            extraPrice,
            quantity,
            images,
            extraOption = [{ extraName, extraPrice }],
        } = body;

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
                sizes,
                quantity,
                images,
                extraOption: {
                    deleteMany: {
                        productId: id,
                    },
                    create: extraOption,
                },
            },
        });

        return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify((error as any).message), { status: 400 });
    }
};
