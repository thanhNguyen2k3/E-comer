import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {
    const body = await req.json();

    try {
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
            deleted,
            extraOption = [{ extraName, extraPrice }],
        } = body;

        const existingProduct = await db.product.findFirst({
            where: {
                id,
            },
        });

        if (!existingProduct) return new NextResponse(JSON.stringify({ message: 'Không tìm thấy sản phẩm' }));

        await db.product.update({
            where: {
                id,
            },
            data: {
                name,
                shortDes,
                description,
                price,
                sizes,
                saleOff,
                categoryId,
                quantity,
                images,
                deleted,
                extraOption: {
                    deleteMany: {
                        productId: id,
                    },
                    create: extraOption,
                },
            },
        });

        return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify((error as any).message), { status: 400 });
    }
};
