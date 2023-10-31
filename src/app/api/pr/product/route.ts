import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const existingProduct = await db.product.findMany({
            where: {
                deleted: false,
            },
            include: {
                category: true,
                extraOption: true,
            },
        });

        if (!existingProduct)
            return new NextResponse(JSON.stringify({ message: 'Không tìm thấy sản phẩm nào' }), { status: 201 });

        return new NextResponse(JSON.stringify(existingProduct), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify((error as any).message), { status: 400 });
    }
};

export const POST = async (req: NextRequest) => {
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

        const product = await db.product.create({
            data: {
                name,
                description,
                shortDes,
                price,
                sizes,
                categoryId,
                saleOff,
                quantity,
                images,
                extraOption: {
                    create: extraOption,
                },
            },
        });

        return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify((error as any).message), { status: 400 });
    }
};
