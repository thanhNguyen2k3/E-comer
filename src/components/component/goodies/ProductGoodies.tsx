'use client';

import ProductItem from '../productItem/ProductItem';

type Props = {};

const ProductGoodies = ({}: Props) => {
    return (
        <div className="my-6">
            <h1 className="font-semibold text-4xl text-nav text-center">Latest Merch</h1>
            <p className="text-sub text-sm text-center mt-2">
                Some really popular and interesting items that most Teyvat travelers would love!
            </p>

            <div className="grid grid-cols-4 gap-x-3 max-md:grid-cols-2">
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    );
};

export default ProductGoodies;
