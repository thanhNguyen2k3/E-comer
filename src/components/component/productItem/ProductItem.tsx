'use client';

import { add } from '@/slices/cart';
import { useAppDispatch } from '@/store/hook';
import { ExtandProduct } from '@/types/extend';
import { formartUSD } from '@/utils/formartUSD';
import { CloseOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {
    product?: ExtandProduct;
};

const StyleButtonShop = styled.div`
    position: relative;
    z-index: 1;
    background-color: #6eb89f;
    width: 100%;
    grid-column: span 3 / span 5;
    overflow: hidden;
    max-height: 36px;
    color: #fff;
    gap: 6px;
    place-items: center;

    button {
        text-transform: uppercase;
        display: block;
        min-height: 36px;
        max-height: 36px;
        width: 100%;
        transition: all ease-in 0.2s;
        font-weight: 600;
        span {
            color: #fff;
        }
    }

    &:hover {
        .button-transition {
            margin-top: -36px;
            transition: all ease-in 0.2s;
        }
    }
`;

const StyleSubCription = styled.div`
    position: absolute;
    visibility: hidden;
    z-index: -1;
    left: 0;
    right: 0;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
    height: auto;
    background-color: #fff;
    padding: 6px 6px;
`;

const StyleCardItem = styled.div`
    .style-subcription {
        opacity: 0;
        transition: all ease-in 0.1s;
    }

    &:hover {
        .style-subcription {
            visibility: visible;
            opacity: 1;
        }
    }
`;

const ProductItem = ({ product }: Props) => {
    const dispatch = useAppDispatch();

    const [haveOption, setHaveOption] = useState(false);
    const [select, setSelect] = useState<string>('');
    // const [size, setSize] = useState<string>('');

    const handleSelect = () => {
        if (product?.options.length! > 0) {
            setHaveOption(true);
        } else {
            setHaveOption(false);
            dispatch(add({ ...product!, quantity: 1 }));
        }
    };

    const handleClose = () => {
        setHaveOption(false);
        setSelect('');
    };

    return (
        <StyleCardItem className="group hover:z-[49] relative hover:shadow-2xl bg-white transition-all duration-300">
            <div className="relative">
                <img
                    src={`/uploads/${product?.images[0]}`}
                    alt=""
                    className="w-full h-full max-h-[283px] object-cover"
                />

                {haveOption && (
                    <div>
                        <div
                            className={`absolute  top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white/90 z-50`}
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
                                {product?.options &&
                                    product?.options.map((extra) => (
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
                                        return dispatch(add({ ...product!, quantity: 1, extraSelected: select }));
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
            </div>
            <div className="px-3 text-center py-2 space-y-1">
                <Link
                    href={`/single/${product?.category?.slug}/${product?.slug}`}
                    className="font-semibold text-base text-content max-md:text-[12.6px]"
                >
                    {product?.name}
                </Link>

                <p className="text-sub text-sm max-md:text-[11px]">{product?.category?.name}</p>
                <p className="text-primary font-bold max-md:text-[12.6px]">{formartUSD(product?.price!)}</p>

                <StyleSubCription className="style-subcription">
                    <p className="text-sub text-sm font-normal max-md:text-xs">
                        <span className="font-semibold max-md:text-xs">Official Genshin Impact Merchandise</span>{' '}
                        {product?.shortDes}
                    </p>
                    <div className="relative grid grid-cols-5 place-items-center justify-between px-4 py-2 ">
                        <button className="col-span-1 py-2 flex justify-start">
                            <HeartOutlined className="text-xl text-nav " />
                        </button>

                        <StyleButtonShop>
                            {product?.options!.length! > 0 && (
                                <button className="button-transition lg:text-sm text-xs">Lựa chọn</button>
                            )}
                            <button onClick={handleSelect}>
                                <ShoppingCartOutlined className="text-2xl text-black" />
                            </button>
                        </StyleButtonShop>
                    </div>
                </StyleSubCription>
            </div>
        </StyleCardItem>
    );
};

export default ProductItem;
