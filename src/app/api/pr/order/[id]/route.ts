import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { StatusEnum } from '@/types/enum';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    params: {
        id: string;
    };
};

export const PATCH = async (req: NextRequest, { params: { id } }: Params) => {
    const session = await getAuthSession();

    try {
        const body = await req.json();

        const { status } = body;

        const order = await db.order.findFirst({
            where: {
                id,
            },
        });

        if (!order) {
            return new NextResponse(JSON.stringify({ messgae: 'Order not found' }), { status: 400 });
        }

        const newOrder = await db.order.update({
            where: {
                id,
            },
            data: {
                status,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (newOrder.status === StatusEnum.ORDER_CONFIRM) {
            let holder: any = {};

            newOrder.orderItems.forEach((d) => {
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
        }

        return NextResponse.json(newOrder, { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify(error.message), { status: 400 });
    }
};
