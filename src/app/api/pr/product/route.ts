import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);

        const slug = searchParams.get('category') || undefined;

        const existingProduct = await db.product.findMany({
            where: {
                deleted: false,
                category: {
                    slug,
                },
            },
            include: {
                category: true,
                options: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!existingProduct) return NextResponse.json({ message: 'Không tìm thấy sản phẩm nào' }, { status: 201 });

        return NextResponse.json(existingProduct, { status: 200 });
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
            saleOff,
            categoryId,
            extraName,
            extraPrice,
            images,
            inStock,
            characterIds,
            options = [{ extraName, extraPrice }],
        } = body;

        const characterIdConnect = characterIds.map((id: string) => id);

        const product = await db.product.create({
            data: {
                name,
                description,
                shortDes,
                price,
                categoryId,
                saleOff,
                images,
                inStock,
                options: {
                    create: options,
                },
                groupCharacter: {
                    create: characterIdConnect.map((id: string) => ({
                        character: {
                            connect: {
                                id,
                            },
                        },
                    })),
                },
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify(error.message), { status: 400 });
    }
};
