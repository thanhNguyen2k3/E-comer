import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {
    const body = await req.json();

    const { isPaid, status } = body;

    try {
        const order = await db.order.update({
            where: {
                id,
            },
            data: {
                isPaid,
                status,
            },
            include: {
                orderItems: true,
            },
        });

        let holder: any = {};

        order.orderItems.forEach((d) => {
            if (holder.hasOwnProperty(d.productId)) {
                holder[d.productId] = holder[d.productId] + d.quantity;
            } else {
                holder[d.productId] = d.quantity;
            }
        });

        let obj2: any[] = [];

        for (const prop in holder) {
            obj2.push({ key: prop, value: holder[prop] });
        }

        obj2.map(async (item) => {
            await db.product.updateMany({
                where: {
                    id: item.key,
                },
                data: {
                    inStock: {
                        decrement: item.value,
                    },
                    selled: {
                        increment: item.value,
                    },
                },
            });
        });

        return NextResponse.json({ success: 'success' }, { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 400 });
    }
};
