import { db } from '@/lib/db';
import React from 'react';
import UpdateProduct from '@/components/admin/form/product/Update';

type Params = {
    params: {
        slug: string;
    };
};

const Page = async ({ params: { slug } }: Params) => {
    const existingProduct = await db.product.findUnique({
        where: {
            slug,
        },
        include: {
            extraOption: true,
            category: true,
        },
    });

    const categories = await db.category.findMany();

    return <UpdateProduct product={existingProduct as any} categories={categories} />;
};

export default Page;
