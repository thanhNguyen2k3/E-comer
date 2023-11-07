import { ShopOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CatalogItem from '../catalogItem/CatalogItem';

type Props = {};

const catalogs = [
    '/gallery/cata1.webp',
    '/gallery/cata2.webp',
    '/gallery/cata3.webp',
    '/gallery/cata4.webp',
    '/gallery/cata5.webp',
    '/gallery/cata6.webp',
    '/gallery/cata7.webp',
    '/gallery/cata8.webp',
    '/gallery/cata9.webp',
    '/gallery/cata10.webp',
    '/gallery/cata11.webp',
    '/gallery/cata12.webp',
    '/gallery/cata13.webp',
    '/gallery/cata14.webp',
    '/gallery/cata15.webp',
    '/gallery/cata16.webp',
];

const BrowerCatalog = ({}: Props) => {
    const [first, ...items] = catalogs;

    return (
        <div>
            <h1 className="font-semibold text-4xl text-nav text-center">Shop Genshin Impact Merchandise</h1>
            <p className="text-sub text-sm text-center mt-2">
                Check Genshin.Global full product catalog or jump to a partciular category:
            </p>

            <div className="text-center mt-6 mb-9">
                <Link
                    href={''}
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
                <CatalogItem src={first} className="col-span-2 row-span-2" />

                {items.map((item) => (
                    <CatalogItem src={item} className="col-span-1" />
                ))}
            </div>
        </div>
    );
};

export default BrowerCatalog;
