'use client';

import { ExtandProduct } from '@/types/extend';
import { formartUSD } from '@/utils/formartUSD';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';

type Props = {
    product: ExtandProduct;
};

const ProductItem = ({ product }: Props) => {
    return (
        <div className="group hover:z-10 relative hover:shadow-2xl hover:-mt-4 bg-white transition-all duration-300">
            <div>
                <img src={`/uploads/${product.images[0]}`} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="px-3 text-center py-2 space-y-1 ">
                <Link
                    href={`/shop/${product.category?.slug}/${product.slug}`}
                    className="font-semibold text-base text-content max-md:text-[12.6px]"
                >
                    {product.name}
                </Link>
                <p className="text-sub text-sm max-md:text-[11px]">Official Merchandise</p>
                <p className="text-primary font-bold max-md:text-[12.6px]">{formartUSD(product.price)}</p>
                <div className="absolute z-[99] px-2 bg-white left-0 right-0 opacity-0 group-hover:opacity-100">
                    <p className="text-sub text-sm font-normal max-md:text-xs">
                        <span className="font-semibold max-md:text-xs">Official Genshin Impact Merchandise</span> Coral
                        fleece blanket with hood designed
                    </p>
                    <div className="relative flex justify-between px-4 py-2">
                        <button className="flex-1 flex justify-center py-2">
                            <HeartOutlined className="text-2xl text-nav " />
                        </button>
                        <span className="top-0 bottom-0 w-[1px] bg-sub/60"></span>
                        <button className="flex-1 flex justify-center py-2">
                            <ShoppingCartOutlined className="text-2xl text-nav " />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
