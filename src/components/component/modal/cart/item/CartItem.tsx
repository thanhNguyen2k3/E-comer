import { CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';

type Props = {};

const CartItem = ({}: Props) => {
    return (
        <div className="relative flex gap-x-3">
            <Image src={'/shirt.webp'} width={65} height={65} className="h-full" alt="image" loading="lazy" />

            <div>
                <Link href={''} className="hover:opacity-80 hover:text-content text-sm font-semibold">
                    [Preorder] Wanderer Impression Shirt & Knit Set (Jan 2024) - S{' '}
                </Link>
                <div className="flex gap-x-2 items-center">
                    <span className="text-gray-600 text-xs">x1</span>
                    <span className="font-bold text-primary">$89.99</span>
                </div>
            </div>

            <button className="absolute -right-2 -top-2">
                <CloseOutlined />
            </button>
        </div>
    );
};

export default CartItem;
