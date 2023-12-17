import ProductDetail from '@/components/client/user/productDetail/ProductDetail';
import ProductCarousel from '@/components/component/productCarouse/ProductCarousel';
import Wrapper from '@/components/local/Wrapper';
import AlertWarning from '@/components/ui/AlertWarning';
import { db } from '@/lib/db';
import { Alert, Breadcrumb } from 'antd';

type Params = {
    params: {
        category: string;
        slug: string;
    };
};

const Page = async ({ params: { slug, category } }: Params) => {
    const existingProduct = await db.product.findFirst({
        where: {
            slug,
        },
        include: {
            category: true,
            options: true,
            groupCharacter: {
                include: {
                    character: {
                        include: {
                            region: true,
                            vision: true,
                            weapon: true,
                        },
                    },
                },
            },
        },
    });

    const relatedProduct = await db.product.findMany({
        where: {
            category: {
                slug: category,
            },
            deleted: false,
        },
        include: {
            category: true,
            options: true,
            groupCharacter: {
                include: {
                    character: {
                        include: {
                            region: true,
                            vision: true,
                            weapon: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    return (
        <>
            {!existingProduct ? (
                <Wrapper>
                    <Alert
                        message="Sản phẩm này hiện không tồn tại"
                        description="Vui lòng quay lại trang chủ để tìm kiếm sản phẩm khác mà bạn muốn."
                        type="error"
                        showIcon
                    />
                </Wrapper>
            ) : (
                <>
                    <div className="mx-auto w-layout max-w-full py-2 px-4">
                        <Breadcrumb
                            items={[
                                {
                                    title: 'Shop',
                                    href: '/',
                                },
                                {
                                    title: existingProduct.category?.slug,
                                    href: `/shop/${existingProduct.category?.slug}`,
                                },
                                {
                                    title: existingProduct.slug,
                                },
                            ]}
                        />
                    </div>
                    <ProductDetail product={existingProduct as any} />
                    {relatedProduct.length !== 0 ? (
                        <div className="px-4 lg:px-0">
                            <ProductCarousel heading="Sản phẩm liên quan" products={relatedProduct as any} />
                        </div>
                    ) : (
                        <div className="px-4 lg:px-0">
                            <AlertWarning message="Không tìm thấy sản phẩm nào liên quan" />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Page;
