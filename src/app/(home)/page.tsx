import SlideShow from '@/components/component/slides/SlideShow';
import ProductCarousel from '@/components/component/productCarouse/ProductCarousel';
import React from 'react';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import ProductGoodies from '@/components/component/goodies/ProductGoodies';
import BrowerCatalog from '@/components/component/catalog/BrowerCatalog';
import { db } from '@/lib/db';
import Wrapper from '@/components/local/Wrapper';

type Props = {};

const Page = async ({}: Props) => {
    const products = await db.product.findMany({
        where: {
            deleted: false,
        },
        include: {
            category: true,
            options: true,
        },
    });
    return (
        <div className="relative">
            <div className="relative pb-6">
                <div className={`bg-header absolute top-0 left-0 bottom-0 right-0 z-0`}></div>
                <SlideShow />
            </div>

            {/* Content start */}

            {/* About start */}
            <Wrapper>
                <div className="lg:flex block">
                    <div className="lg:w-2/3 w-full lg:p-6">
                        <p className="text-sub lg:text-xl md:text-lg text-sm text-center tracking-wide">
                            <strong className="font-semibold">Genshin Impact</strong> and{' '}
                            <strong className="font-semibold">Honkai: Star Rail</strong> are popular video games
                            developed by miHoYo that have gained their sizeable fanbases globally since the releases in
                            2020 and 2023 respectively. There are many different types of Genshin Impact merchandise
                            available, including Clothing, Accessories, Plushies, Figures, Computer & Digital Devices,
                            Artbooks, OST CD Albums, and even some Limited Edition products and collectibles etc. On the
                            other hand Honkai: Star Rail, riding its strong start and popularity, is growing its line of
                            merch to meet fans’ appetite.
                        </p>

                        <div className="flex gap-x-4 p-4 shadow-lg mt-4">
                            <Image
                                src="/green-card.webp"
                                className="object-top object-contain"
                                width={30}
                                height={30}
                                alt=""
                            />

                            <div>
                                <h2 className="font-medium text-lg mb-2">Disclaimer</h2>

                                <p className="text-sm text-sub lg:text-xl md:text-lg">
                                    All information of the official merchandise listed in this online shop are
                                    properties of miHoYo & Hoyoverse (Cognosphere). Genshin.Global is NOT a
                                    representative of the companies and by no means pretending to be an official
                                    channel. Here Genshin.Global serves as a middleman to help purchase your desired
                                    official products through official channels and manage the exporting and shipping
                                    for you.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 w-full px-7 py-6">
                        <header className="text-xs font-normal">Advertisement</header>
                    </div>
                </div>
            </Wrapper>
            {/* About end */}

            {/* Product carousel start */}

            <ProductCarousel products={products} />

            {/* Product carousel end */}

            {/* Teyvat Goodies start */}
            <div className="max-w-full w-layout mx-auto">
                <Heading title="MORE GENSHIN IMPACT MERCH" />

                <ProductGoodies products={products} />
            </div>
            {/* Teyvat Goodies end */}

            {/* Catalog start */}

            <div className="max-w-full w-layout mx-auto">
                <Heading title="MORE GENSHIN IMPACT PLUSHIES" />
                <BrowerCatalog />
            </div>

            {/* Catalog end */}

            {/* Content end */}
        </div>
    );
};

export default Page;
