import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { StatusEnum } from '@/types/enum';
import { ExtandProduct } from '@/types/extend';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const session = await getAuthSession();
        const body = await req.json();
        const { fullName, payMethod, deliveryMethod, total, phone, address, orderItems } = body;

        if (!session) {
            return NextResponse.json({ message: 'Không tìm thấy khách hàng' }, { status: 403 });
        }

        const order = await db.order.create({
            data: {
                fullName,
                address,
                deliveryMethod,
                phone,
                userId: session?.user.id,
                status: StatusEnum.ORDER_CONFIRM,
                payMethod,
                total,
                isPaid: false,
                orderItems: {
                    create: orderItems.map((product: ExtandProduct & { extraSelected?: string }) => ({
                        product: {
                            connect: {
                                id: product.id,
                            },
                        },
                        quantity: product.quantity,
                        name:
                            product?.extraSelected?.length! > 0
                                ? `${product.name} - ${product.extraSelected}`
                                : product.name,
                    })),
                },
            },
        });

        return NextResponse.json(order, { status: 200 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify(error.message), { status: 400 });
    }
};
