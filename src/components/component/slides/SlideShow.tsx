'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from 'next/image';

type Props = {};

const slides = ['slide1.webp', 'slide2.webp', 'slide3.webp', 'slide4.webp', 'slide5.webp'];

const SlideShow = ({}: Props) => {
    return (
        <div className="max-w-full mx-auto w-layout">
            <Swiper
                pagination={{
                    clickable: true,
                }}
                spaceBetween={30}
                modules={[Pagination]}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide}>
                        <img src={`/${slide}`} className="w-full h-full" alt="slide" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SlideShow;
