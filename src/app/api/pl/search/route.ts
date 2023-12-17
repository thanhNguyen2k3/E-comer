import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);

        const query = searchParams.get('q');

        const category = searchParams.get('category') || undefined;

        const products = await db.product.findMany({
            where: {
                deleted: false,
                name: {
                    contains: query!.toLowerCase(),
                    mode: 'insensitive',
                },
                category: {
                    slug: category,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                category: true,
                options: true,
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json(products);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }));
    }
};
