import { db } from '@/lib/db';

export const getTotalRevenue = async () => {
    const paidOrders = await db.order.findMany({
        where: {
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const totalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + item.product.price * item.quantity;
        }, 0);

        return total + orderTotal;
    }, 0);

    return totalRevenue;
};
