import { db } from '@/lib/db';

export const getInstockCount = async () => {
    const instockCount = await db.product.findMany({
        where: {
            inStock: {
                gt: 0,
            },
        },
    });

    const totalInstock = instockCount.reduce((total, order) => {
        return total + order.inStock;
    }, 0);

    return totalInstock;
};
