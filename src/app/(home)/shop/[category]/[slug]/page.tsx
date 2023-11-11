import ProductDetail from '@/components/client/user/productDetail/ProductDetail';
import { db } from '@/lib/db';
import { Alert, Breadcrumb } from 'antd';

type Params = {
    params: {
        category: string;
        slug: string;
    };
};

const Page = async ({ params: { slug } }: Params) => {
    const existingProduct = await db.product.findFirst({
        where: {
            slug,
        },
        include: {
            category: true,
            extraOption: true,
        },
    });

    return (
        <>
            {!existingProduct ? (
                <div className="w-layout max-w-full mx-auto px-2">
                    <Alert
                        message="Sản phẩm này hiện không tồn tại"
                        description="Vui lòng quay lại trang chủ để tìm kiếm sản phẩm khác mà bạn muốn."
                        type="error"
                        showIcon
                    />
                </div>
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
                    <ProductDetail product={existingProduct} />
                </>
            )}
        </>
    );
};

export default Page;
