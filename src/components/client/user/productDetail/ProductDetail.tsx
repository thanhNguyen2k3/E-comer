'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import { ExtandProduct } from '@/types/extend';
import { formartUSD } from '@/utils/formartUSD';
import { Divider, Radio } from 'antd';
import Link from 'next/link';
import { HeartOutlined } from '@ant-design/icons';
import {
    BiLogoFacebook,
    BiLogoGmail,
    BiLogoPinterestAlt,
    BiLogoTelegram,
    BiLogoTwitter,
    BiLogoWhatsapp,
} from 'react-icons/bi';

type Props = {
    product: ExtandProduct;
};

const networks = [
    {
        id: 1,
        icon: <BiLogoFacebook />,
        link: '',
    },
    {
        id: 2,
        icon: <BiLogoTwitter />,
        link: '',
    },
    {
        id: 3,
        icon: <BiLogoGmail />,
        link: '',
    },
    {
        id: 4,
        icon: <BiLogoPinterestAlt />,
        link: '',
    },
    {
        id: 5,
        icon: <BiLogoWhatsapp />,
        link: '',
    },
    {
        id: 6,
        icon: <BiLogoTelegram />,
        link: '',
    },
];

const ProductDetail = ({ product }: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <div className="bg-gray-50">
            <div className="grid lg:grid-cols-7 grid-cols-1 gap-x-6 px-4 gap-y-4">
                <div className="col-span-3">
                    <div className="flex flex-row-reverse">
                        <Swiper
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 lg:w-full w-[1000px]"
                        >
                            {product.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img className="w-full h-full object-cover" src={`/uploads/${img}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <Swiper
                            style={{ width: '20%', marginRight: 20 }}
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="swiper-small-custom mySwiper lg:!grid !hidden"
                        >
                            {product.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img className="w-full h-full object-cover" src={`/uploads/${img}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="col-span-3 text-center font-semibold space-y-4">
                    <h1 className="text-3xl capitalize">{product.name}</h1>
                    <p className="text-primary text-xl">{formartUSD(product.price)}</p>
                    <p className="text-sm">{product.category?.name}</p>
                    <p className="font-normal">{product.shortDes}</p>
                    <p>
                        Thông tin khác từ cùng một bộ:{' '}
                        <Link href={''} className="text-third font-normal">
                            {product.name}
                        </Link>
                    </p>
                    <div className="flex justify-center w-full">
                        <span className="border border-b border-nav/40 w-6"></span>
                    </div>

                    <p className="text-hot">Ngày xuất cảnh dự kiến: Tháng 2 năm 2024</p>

                    <p className="font-normal text-xs text-left">
                        Vui lòng đọc <span className="text-[#ff00ff]">Điều khoản & Điều kiện</span> đặt hàng trước/đặt
                        hàng trước trước khi đặt hàng. Đặt hàng trước/đặt lại theo nghĩa đen là ký kết "hợp đồng" với
                        Genshin.Global, với tư cách là người bán có trách nhiệm, chúng tôi có nghĩa vụ đảm bảo bạn biết
                        các điều khoản.
                    </p>

                    <div>
                        <h3 className="mb-2">Size:</h3>
                        <Radio.Group options={product.sizes} className="antd-radio-custom" />
                    </div>

                    <div className="flex justify-center gap-x-4 py-3">
                        <div>
                            <button className="border border-b px-2 py-2">-</button>
                            <input type="number" className="outline-none py-2 px-2 w-14 border text-center" min={1} />
                            <button className="border px-2 py-2">+</button>
                        </div>
                        <button className="px-4 bg-primary py-2 text-white">Thêm vào giỏ hàng</button>
                    </div>
                    <button className="hover:text-nav">
                        <i>
                            <HeartOutlined />
                        </i>{' '}
                        Thêm vào danh sách yêu thích{' '}
                    </button>

                    <Divider style={{ backgroundColor: 'whitesmoke' }} />

                    <div className="space-y-2">
                        <p className="font-normal tracking-wider">
                            <span className="font-semibold">Thể loại: </span>
                            {product.category?.name}
                        </p>
                        <p className="font-normal tracking-wider">
                            <span className="font-semibold">Tags: </span>
                            {product.name}
                        </p>
                        <div className="font-normal tracking-wider flex items-center gap-x-2 justify-center">
                            <span className="font-semibold">Share: </span>
                            {networks.map((network) => (
                                <Link href={''} className="text-nav text-base" key={network.id}>
                                    {network.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-span-1 lg:block hidden">
                    <h1>HOT products</h1>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
