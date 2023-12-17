import { add } from '@/slices/cart';
import { useAppDispatch } from '@/store/hook';
import { ExtandProduct } from '@/types/extend';
import { formartUSD } from '@/utils/formartUSD';
import { CloseOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Tooltip, message } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
    product: ExtandProduct;
};

const ProductMerch = ({ product }: Props) => {
    let path = usePathname();

    let root = path === '/shop';

    const isMediumScreen = useMediaQuery({
        query: '(max-width: 768px)',
    });

    const isSmallScreen = useMediaQuery({
        query: '(max-width: 640px)',
    });

    const media320 = useMediaQuery({
        query: '(max-width: 320px)',
    });

    const media375 = useMediaQuery({
        query: '(max-width: 375px)',
    });

    const media425 = useMediaQuery({
        query: '(max-width: 1024px)',
    });

    const media1024 = useMediaQuery({
        query: '(max-width: 425px)',
    });

    const dispatch = useAppDispatch();

    const [haveOption, setHaveOption] = useState(false);
    const [select, setSelect] = useState<string>('');
    // const [size, setSize] = useState<string>('');

    const handleSelect = () => {
        if (product.options.length > 0) {
            setHaveOption(true);
        } else {
            setHaveOption(false);
            dispatch(add({ ...product, quantity: 1 }));
        }
    };

    const handleClose = () => {
        setHaveOption(false);
        setSelect('');
    };

    return (
        <div className="relative z-20 group w-full">
            <div className="relative flex overflow-hidden w-full">
                <a
                    className={`flex flex-1 relative w-[121px] h-[121px] min-[375px]:w-[148px] min-[375px]:h-[148px] min-[425px]:w-[174px] min-[425px]:h-[174px] sm:w-[182px] sm:h-[182px] md:w-[207px] md:h-[207px] lg:w-[207px] lg:h-[207px] ${
                        root ? '' : 'xl:w-[283px] xl:h-[283px]'
                    }`}
                >
                    <img
                        className="z-20 opacity-100 duration-[1500ms]  object-cover w-full h-full hover:opacity-0 top-0 left-0 right-0 bottom-0 absolute transition-all group-hover:scale-110"
                        src={`/uploads/${product?.images![0]}`}
                        alt=""
                    />

                    <img
                        className={`opacity-100  h-full w-full  object-cover duration-[1500ms] z-10 top-0 left-0 right-0 bottom-0 absolute transition-all group-hover:scale-110`}
                        src={`/uploads/${product?.images![1]}`}
                        alt=""
                    />
                </a>

                {haveOption && (
                    <div>
                        <div
                            className={`absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/90 z-50`}
                        >
                            <button className="absolute top-2 right-2 hover:opacity-70" onClick={handleClose}>
                                <CloseOutlined />
                                <span className="ml-1">Đóng</span>
                            </button>
                            <select
                                onChange={(e) => setSelect(e.target.value)}
                                className="w-full mx-4 shadow text-center text-nav rounded group px-2 py-2 outline-none"
                            >
                                <option value="">-- Vui lòng chọn --</option>
                                {product.options &&
                                    product.options.map((extra) => (
                                        <option key={extra.id} value={extra.extraName}>
                                            {extra.extraName}
                                        </option>
                                    ))}
                            </select>

                            <button
                                onClick={() => {
                                    if (select.length > 0) {
                                        setSelect('');
                                        handleClose();
                                        return dispatch(add({ ...product, quantity: 1, extraSelected: select }));
                                    } else {
                                        message.info('Hãy hoàn tất lựa chọn của bạn');
                                    }
                                }}
                                className="absolute bottom-0 w-full uppercase font-semibold text-white bg-primary py-4"
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                )}
                <div className="absolute z-30 flex flex-col top-2 right-2">
                    <Tooltip placement="left" title="Add to wish">
                        <button className="flex items-center">
                            <div className="relative flex items-center justify-center p-3 transition-all translate-x-20 bg-white dark:text-white group-hover:translate-x-0">
                                <HeartOutlined className="text-xl text-nav" />
                            </div>
                        </button>
                    </Tooltip>
                    <Tooltip placement="left" title={`${product?.options!.length > 0 ? 'Lựa chọn' : 'Thêm giỏ hàng'}`}>
                        <button className="flex items-center" onClick={handleSelect}>
                            <div className="relative flex items-center justify-center p-3 transition-all translate-x-20 bg-white dark:text-white group-hover:translate-x-0">
                                <ShoppingCartOutlined className="text-xl text-nav" />
                            </div>
                        </button>
                    </Tooltip>
                </div>
            </div>

            <div className="text-center mt-2 space-y-1">
                <h1>
                    <Link
                        href={`/single/${product?.category?.slug}/${product?.slug}`}
                        className="mb-2 text-sm font-semibold text-content hover:text-sub"
                    >
                        {product?.name}
                    </Link>
                </h1>

                <div>
                    <p>
                        <Link href={`/shop/${product?.category?.slug}`} className="text-sub">
                            {product?.category?.slug}
                        </Link>
                    </p>
                    <p className="text-primary font-semibold mt-1">{formartUSD(product?.price)}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductMerch;
