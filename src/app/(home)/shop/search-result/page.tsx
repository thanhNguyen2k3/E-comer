import ProductItem from '@/components/component/productItem/ProductItem';
import AlertWarning from '@/components/ui/AlertWarning';
import Paginated from '@/components/ui/Paginated';
import { PER_PAGE } from '@/constant';
import { db } from '@/lib/db';
import React from 'react';

type DynamicParams = {
    searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ searchParams }: DynamicParams) => {
    const query = searchParams['q'] as string;
    const page = searchParams['page'] ?? '1';
    const currentPage = Math.max(Number(page), 1);

    const options: {
        deleted: boolean;
        name: any;
    } = {
        deleted: false,
        name: {
            contains: query?.toString()?.toLowerCase(),
            mode: 'insensitive',
        },
    };

    const products = await db.product.findMany({
        where: options,
        include: {
            category: true,
            options: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        skip: (currentPage - 1) * PER_PAGE,
        take: PER_PAGE,
    });

    const count = await db.product.count({
        where: options,
    });

    return (
        <div>
            {products?.length === 0 ? (
                <AlertWarning message="Không tìm thấy sản phẩm nào phù hợp với lựa chọn của bạn." />
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}

            {products.length > 0 && <Paginated routing={`?q=${query}`} count={count} />}
        </div>
    );
};

export default Page;
