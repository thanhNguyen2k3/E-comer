import CheckoutDetail from '@/components/client/user/checkout/CheckoutDetail';
import { db } from '@/lib/db';

const Page = async () => {
    const products = await db.product.findMany({
        include: {
            category: true,
            options: true,
        },
    });

    const orderItems = await db.orderItem.findMany({
        include: {
            product: true,
        },
    });
    return (
        <div>
            <CheckoutDetail products={products} orderItems={orderItems} />
        </div>
    );
};

export default Page;
