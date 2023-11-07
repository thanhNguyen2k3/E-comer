import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

type Props = {};

const ProductItem = ({}: Props) => {
    return (
        <div className="group hover:z-10 relative hover:shadow-2xl hover:-mt-4 bg-white transition-all duration-300">
            <div>
                <img src="/abyss.webp" alt="" className="w-full h-full" />
            </div>
            <div className="px-3 text-center py-2 space-y-1 ">
                <h2 className="font-semibold text-base text-content max-md:text-[12.6px]">
                    Cryo Abyss Mage Hooded Plush Blanket
                </h2>
                <p className="text-sub text-sm max-md:text-[11px]">Official Merchandise</p>
                <p className="text-primary font-bold max-md:text-[12.6px]">$58.99</p>
                <div className="absolute z-[99] px-2 bg-white left-0 right-0 shadow opacity-0 group-hover:opacity-100">
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
