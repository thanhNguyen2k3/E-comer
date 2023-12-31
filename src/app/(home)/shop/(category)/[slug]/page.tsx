import ProductItem from '@/components/component/productItem/ProductItem';
import AlertWarning from '@/components/ui/AlertWarning';
import Paginated from '@/components/ui/Paginated';
import { PER_PAGE } from '@/constant';
import { db } from '@/lib/db';

type Props = {
    params: {
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params: { slug }, searchParams }: Props) => {
    const page = searchParams['page'] ?? '1';

    const currentPage = Math.max(Number(page), 1);

    const characterId = searchParams['filter_character']?.toString() || undefined;

    const products = await db.product.findMany({
        where: {
            category: {
                slug: slug,
            },
            groupCharacter:
                characterId === undefined
                    ? {
                          every: {
                              characterId,
                          },
                      }
                    : {
                          some: {
                              characterId,
                          },
                      },
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
            createdAt: 'desc',
        },
        skip: (currentPage - 1) * PER_PAGE,
        take: PER_PAGE,
    });

    const count = await db.product.count({
        where: {
            deleted: false,
            category: {
                slug: slug,
            },
            groupCharacter:
                characterId === undefined
                    ? {
                          every: {
                              characterId,
                          },
                      }
                    : {
                          some: {
                              characterId,
                          },
                      },
        },
    });

    return (
        <div>
            <div className="mt-6">
                {products?.length === 0 ? (
                    <AlertWarning message="Không tìm thấy sản phẩm nào phù hợp với lựa chọn của bạn." />
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {products?.length > 0 && <Paginated routing={`?`} count={count} />}
        </div>
    );
};

export default Page;
