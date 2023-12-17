import { ShopOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CatalogItem from '../catalogItem/CatalogItem';
import { db } from '@/lib/db';

const BrowerCatalog = async () => {
    const categories = await db.category.findMany({
        include: {
            products: true,
        },
    });
    const [first, ...items] = categories;

    return (
        <div>
            <h1 className="font-semibold text-4xl text-nav text-center">Shop Genshin Impact Merchandise</h1>
            <p className="text-sub text-sm text-center mt-2">
                Check Genshin.Global full product catalog or jump to a partciular category:
            </p>

            <div className="text-center mt-6 mb-9">
                <Link
                    href={'/shop'}
                    className="!text-white gap-x-1 transition-all duration-200 inline-flex justify-center px-6 py-2 text-base font-semibold uppercase bg-primary hover:opacity-75"
                >
                    <span>
                        <ShopOutlined />
                    </span>
                    <span>BROWSE CATALOG</span>
                </Link>
            </div>

            {/* CATALOG */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <CatalogItem src={first?.thumbnail} to={`/shop/${first.slug}`} className="col-span-2 row-span-2" />

                {items?.map((item) => (
                    <CatalogItem
                        key={item.id}
                        to={`/shop/${item.slug}`}
                        src={item.thumbnail}
                        data={item}
                        className="col-span-1"
                    />
                ))}
            </div>
        </div>
    );
};

export default BrowerCatalog;
