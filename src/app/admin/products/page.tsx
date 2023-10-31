import ProductData from '@/components/client/admin/ProductData';
import { db } from '@/lib/db';

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ searchParams }: Props) => {
    const productId = searchParams['productId'];

    const products = await db.product.findMany({
        where: {
            deleted: false,
        },
        include: {
            extraOption: true,
            category: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    const extraOptions = await db.extraOption.findMany({
        where: {
            productId: productId as string,
        },
        include: {
            product: true,
        },
    });

    const categories = await db.category.findMany();

    return <ProductData products={products} extraOptions={extraOptions} categories={categories} />;
};

export default Page;
