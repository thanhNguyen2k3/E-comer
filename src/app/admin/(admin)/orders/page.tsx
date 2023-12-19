import OrderData from '@/components/client/admin/OrderData';
import { db } from '@/lib/db';

const Page = async () => {
    const orders = await db.order.findMany({
        where: {
            deleted: false,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
            user: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div>
            <OrderData orders={orders} />
        </div>
    );
};

export default Page;
