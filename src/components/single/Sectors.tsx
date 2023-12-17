'use client';

import { Category, Product } from '@prisma/client';
import { Select } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

type ExtandCategory = Category & {
    products: Product[];
};

type Props = {
    categories: ExtandCategory[];
};

const { Option } = Select;

const StyledSelect = styled(Select)`
    min-width: 160px;

    .ant-select-selector {
        border-radius: 0;
        text-align: center;
    }
`;

const Sectors = ({ categories }: Props) => {
    const [selected, setSelected] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const router = useRouter();

    const onChange = (value: string) => {
        setSelected(value);

        if (value === '') {
            router.push('/shop');
        }
        {
            router.push(`/shop/${value}`, { scroll: false });
        }
    };

    const onChange2 = (value: string) => {
        setLink(value);

        if (selected.length === 0) {
            router.push(`/shop/character/${value}`, {
                scroll: false,
            });
        } else {
            router.push(`/shop/${selected}/${value}`, {
                scroll: false,
            });
        }
    };

    return (
        <div>
            <div className="hidden xl:block">
                <div>
                    <Swiper className="z-10">
                        <SwiperSlide>
                            <img src="/banner1.webp" alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/banner2.webp" alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>

                <h1 className="text-base font-semibold mt-8 mb-4">DANH MỤC SẢN PHẨM</h1>

                <div>
                    <ul className="space-y-2 xl:block hidden">
                        <li className="relative">
                            <Link href={`/shop`} className="text-sm font-normal block group">
                                <span className="text-nav">Tất cả</span>
                            </Link>
                        </li>
                        {categories.map((cate) => (
                            <li key={cate.id} className="relative">
                                <Link
                                    href={`/shop/${cate.slug}`}
                                    scroll={false}
                                    className="text-sm font-normal block group"
                                >
                                    <span className="text-nav">{cate.name}</span>
                                    <span className="absolute right-0 w-7 h-5 inline-flex items-center justify-center border group-hover:text-white group-hover:bg-primary rounded-full">
                                        {cate.products.length}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sectors;
