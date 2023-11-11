'use client';

import { ArrowRightOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
    const router = usePathname();

    return (
        <>
            <div className="relative">
                <div className={`bg-header absolute top-0 left-0 right-0 bottom-0`}></div>
                <div className="lg:h-[160px] h-[60px] flex items-center justify-center relative">
                    <Breadcrumb
                        style={{
                            color: 'whitesmoke',
                        }}
                        separator={<ArrowRightOutlined className="text-white text-xl flex h-full items-center" />}
                    >
                        <Breadcrumb.Item
                            href="/shopping-cart"
                            className={`${
                                router === '/shopping-cart' && '!text-primary'
                            } uppercase text-xl font-semibold hover:!text-nav`}
                        >
                            shopping cart
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            href="/checkout"
                            className={`${
                                router === '/checkout' && '!text-primary'
                            } text-sub uppercase text-xl font-semibold hover:!text-nav`}
                        >
                            checkout
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            className={`${
                                router === '/checkout' && '!text-primary'
                            } text-sub uppercase text-xl font-semibold hover:!text-nav`}
                        >
                            ORDER COMPLETE
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>

            {children}
        </>
    );
};

export default Layout;
