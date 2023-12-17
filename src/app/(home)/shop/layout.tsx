import Wrapper from '@/components/local/Wrapper';
import BestSelling from '@/components/single/BestSelling';
import FilterByCharacters from '@/components/single/FilterByCharacters';
import Sectors from '@/components/single/Sectors';
import BreadCumb from '@/components/ui/BreadCumb';
import { db } from '@/lib/db';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

const Layout = async ({ children }: Props) => {
    const categories = await db.category.findMany({
        include: {
            products: true,
        },
    });

    const characters = await db.character.findMany({
        include: {
            groupCharacter: {
                include: {
                    character: {
                        include: {
                            region: true,
                            vision: true,
                            weapon: true,
                        },
                    },
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });

    const bestSelling = await db.product.findMany({
        where: {
            deleted: false,
            selled: {
                gt: 1,
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
            selled: 'desc',
        },
    });

    return (
        <>
            <BreadCumb />

            <Wrapper>
                <div className="grid grid-cols-1 gap-x-6 xl:grid-cols-4">
                    <div className="col-span-1">
                        <Sectors categories={categories} />
                        <FilterByCharacters characters={characters} />
                    </div>

                    <div className="col-span-3">
                        <div>
                            <h1 className="text-2xl font-semibold text-center mb-6">
                                Shop Genshin Impact & Honkai: Star Rail Merch
                            </h1>
                            <BestSelling products={bestSelling} />
                        </div>
                        {children}
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default Layout;
