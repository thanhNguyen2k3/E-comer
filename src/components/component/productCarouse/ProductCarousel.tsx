'use client';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';

type Props = {};

const ProductCarousel = ({}: Props) => {
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

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return '<span class="' + className + '">' + '</span>';
        },
    };

    return (
        <section className="mx-auto w-layout max-w-full">
            <h1 className="font-semibold text-4xl text-nav mt-6 mb-10 text-center">Latest Merch</h1>

            <Swiper
                slidesPerView={isSmallScreen ? 2 : isMediumScreen ? 3 : 4}
                spaceBetween={isSmallScreen ? 10 : isMediumScreen ? 15 : 20}
                pagination={pagination}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="max-[420px]:h-[330px] h-[436px]"
            >
                {[...new Array(10)].map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative z-20 group">
                            <div className="relative block overflow-hidden ">
                                <a
                                    href=""
                                    className={`block relative ${
                                        media320
                                            ? 'h-[155px]'
                                            : media375
                                            ? 'h-[182px]'
                                            : media425
                                            ? 'h-[246px]'
                                            : isMediumScreen
                                            ? 'h-[240px]'
                                            : media1024
                                            ? 'h-[233px]'
                                            : 'h-[283px]'
                                    }  w-full`}
                                >
                                    <img
                                        className="z-20 opacity-100 duration-[1500ms] hover:opacity-0 object-cover top-0 left-0 right-0 bottom-0 absolute w-full h-full transition-all group-hover:scale-110"
                                        src="https://i.postimg.cc/x8LtrkfV/kenny-eliason-HIz-Gn9-FZDFU-unsplash.jpg"
                                        alt=""
                                    />

                                    <img
                                        className={`opacity-100 w-full h-full duration-[1500ms] z-10 top-0 left-0 right-0 bottom-0 absolute transition-all group-hover:scale-110`}
                                        src="https://i.postimg.cc/K8qmN64m/pexels-javon-swaby-2783873.jpg"
                                        alt=""
                                    />
                                </a>
                                <div className="absolute z-30 flex flex-col top-2 right-2">
                                    <Tooltip placement="left" title="Add to wish">
                                        <button className="flex items-center">
                                            <div className="relative flex items-center justify-center p-3 transition-all translate-x-20 bg-white dark:text-white group-hover:translate-x-0">
                                                <HeartOutlined className="text-xl text-nav" />
                                            </div>
                                        </button>
                                    </Tooltip>
                                    <Tooltip placement="left" title="Add to cart">
                                        <button className="flex items-center">
                                            <div className="relative flex items-center justify-center p-3 transition-all translate-x-20 bg-white dark:text-white group-hover:translate-x-0">
                                                <ShoppingCartOutlined className="text-xl text-nav" />
                                            </div>
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="text-center mt-2 space-y-1">
                                <h1>
                                    <Link href={''} className="mb-2 text-sm font-semibold text-content hover:text-sub">
                                        1800X Zoom Level Nikon Lense
                                    </Link>
                                </h1>

                                <div>
                                    <p>
                                        <Link href={''} className="text-sub">
                                            Honkai: Star Rail Official Merchandise
                                        </Link>
                                    </p>
                                    <p className="text-primary font-semibold mt-1">$17.99</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ProductCarousel;
