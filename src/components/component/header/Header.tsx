'use client';

import Image from 'next/image';
import Link from 'next/link';
import DrawerMobileMenu from '../mobile/DrawerMobileMenu';
import DrawerCart from '../modal/cart/DrawerCart';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { CloudDownloadOutlined, FolderFilled, HeartOutlined, ShopFilled } from '@ant-design/icons';
import { useWindowOffsetHeight } from '@/hooks/useWindowDimensions';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
    {
        key: 'all-news',
        label: (
            <Link className="font-normal hover:!text-primary text-content text-sm" href={''}>
                All News
            </Link>
        ),
    },
    {
        key: 'game',
        label: (
            <Link className="font-normal hover:!text-primary text-content text-sm" href={''}>
                Latest Game Merchandise
            </Link>
        ),
    },
    {
        key: 'wish',
        label: (
            <Link className="font-normal hover:!text-primary text-content text-sm" href={''}>
                Wish Banner
            </Link>
        ),
    },
    {
        key: 'code',
        label: (
            <Link className="font-normal hover:!text-primary text-content text-sm" href={''}>
                Promotion Code
            </Link>
        ),
    },
];

const characters: MenuProps['items'] = [
    {
        key: 'All Characters',
        label: (
            <Link href={''} className="hover:!text-primary">
                All Characters
            </Link>
        ),
        icon: <FolderFilled className="!text-lg text-nav" />,
    },
    {
        key: 'Mondstadt',
        label: (
            <Link href={''} className="hover:!text-primary">
                Mondstadt
            </Link>
        ),
        icon: <FolderFilled className="!text-lg text-nav" />,
    },
    {
        key: 'Liyue',
        label: (
            <Link href={''} className="hover:!text-primary">
                Liyue
            </Link>
        ),
        icon: <FolderFilled className="!text-lg text-nav" />,
    },
    {
        key: 'Inazuma',
        label: (
            <Link href={''} className="hover:!text-primary">
                Inazuma
            </Link>
        ),
        icon: <FolderFilled className="!text-lg text-nav" />,
    },
    {
        key: 'Sumeru',
        label: (
            <Link href={''} className="hover:!text-primary">
                Sumeru
            </Link>
        ),
        icon: <FolderFilled className="!text-lg text-nav" />,
    },
    {
        key: 'Fontaine',
        label: (
            <Link href={''} className="hover:!text-primary">
                Fontaine
            </Link>
        ),
        icon: <FolderFilled className="!text-lg text-nav" />,
    },
    {
        key: 'Traveler',
        label: (
            <Link href={''} className="hover:!text-primary">
                Traveler
            </Link>
        ),
    },
    {
        key: 'Paimon',
        label: (
            <Link href={''} className="hover:!text-primary">
                Paimon
            </Link>
        ),
    },
    {
        key: 'Eleven Fatui Harbingers',
        label: (
            <Link href={''} className="hover:!text-primary">
                Eleven Fatui Harbingers
            </Link>
        ),
    },
];

const worlds: MenuProps['items'] = [
    {
        key: 'regions',
        label: <button className="text-content hover:text-primary">Regions</button>,
        children: [
            {
                key: 'monst',
                label: <Link href={''}>Mondstadt</Link>,
            },
            {
                key: 'Liyue',
                label: <Link href={''}>Liyue</Link>,
            },
            {
                key: 'Inazuma',
                label: <Link href={''}>Inazuma</Link>,
            },
            {
                key: 'Sumeru',
                label: <Link href={''}>Sumeru</Link>,
            },
            {
                key: 'Fontaine',
                label: <Link href={''}>Fontaine</Link>,
            },
        ],
    },
    {
        key: '',
        label: <button className="text-content hover:text-primary">Weapons</button>,
        children: [
            {
                key: 'Bows',
                label: <Link href={''}>Bows</Link>,
            },
            {
                key: 'Catalysts',
                label: <Link href={''}>Catalysts</Link>,
            },
            {
                key: 'Claymores',
                label: <Link href={''}>Claymores</Link>,
            },
            {
                key: 'Polearms',
                label: <Link href={''}>Polearms</Link>,
            },
            {
                key: 'Swords',
                label: <Link href={''}>Swords</Link>,
            },
        ],
    },
];

const fanArts: MenuProps['items'] = [
    {
        label: <Link href={''}>Fanart Illustrators</Link>,
        key: 'fan art',
        icon: <HeartOutlined className="!text-lg" />,
    },
    {
        label: <Link href={''}>Official Wallpapers</Link>,
        key: 'wallpaper',
        icon: <CloudDownloadOutlined className="!text-lg" />,
    },
    {
        label: <Link href={''}>Gallery: Official Art</Link>,
        key: 'Official',
    },
    {
        label: <Link href={''}>Gallery: All Artworks</Link>,
        key: 'Artworks',
    },
];

const about: MenuProps['items'] = [
    {
        label: <Link href={''}>Genshin Impact</Link>,
        key: 'gi',
        icon: <HeartOutlined />,
    },
    {
        label: <Link href={''}>Manga</Link>,
        key: 'manga',
        icon: <CloudDownloadOutlined />,
    },
    {
        label: <Link href={''}>Genius Invokation Trading Card Game (TCG)</Link>,
        key: 'tcg',
    },
    {
        label: <Link href={''}>Game Versions</Link>,
        key: 'gv',
    },
];

const Header = () => {
    const headerHeight = 90;

    const { offset } = useWindowOffsetHeight();

    const router = usePathname();
    let rootPathname = '/';

    return (
        <div className="relative">
            {router === rootPathname || router === '/shopping-cart' ? (
                <div className={`bg-header absolute top-0 left-0 right-0 bottom-0`}></div>
            ) : null}
            <div className={`lg:py-5 w-layout max-w-full mx-auto z-50 relative`}>
                {/* Tablet and Window Interface start */}

                <motion.div
                    animate={
                        offset > headerHeight
                            ? {
                                  height: headerHeight - 30,
                                  position: 'fixed',
                                  zIndex: 9999,
                                  top: 0,
                                  left: 0,
                                  right: 0,
                              }
                            : { height: headerHeight }
                    }
                    initial={{ height: 90 }}
                    className={`hidden mx-auto max-w-full relative pl-2 bg-white pr-1 lg:flex justify-between items-center h-[${
                        headerHeight - 30
                    }px] lg:h-[${headerHeight}px] shadow-sm`}
                >
                    <div className="flex w-layout mx-auto max-w-full justify-between items-center bg-white">
                        <Image src={'/logo.webp'} alt="logo" width={180} height={36} />

                        {/* Nav start */}
                        {/* <Menu mode="horizontal" items={items} /> */}

                        <Space size={'large'}>
                            <Dropdown menu={{ items }}>
                                <Link
                                    href={''}
                                    className="uppercase block leading-[46px] font-semibold !text-content text-sm hover:!text-primary hover:drop-shadow"
                                >
                                    News & Events
                                </Link>
                            </Dropdown>

                            <Dropdown menu={{ items: characters }}>
                                <Link
                                    href={''}
                                    className="uppercase block leading-[46px] font-semibold !text-content text-sm hover:!text-primary hover:drop-shadow"
                                >
                                    Characters
                                </Link>
                            </Dropdown>

                            <Dropdown menu={{ items: worlds }}>
                                <Link
                                    href={''}
                                    className="uppercase block leading-[46px] font-semibold !text-content text-sm hover:!text-primary hover:drop-shadow"
                                >
                                    The World
                                </Link>
                            </Dropdown>

                            <Dropdown menu={{ items: fanArts }}>
                                <Link
                                    href={''}
                                    className="uppercase block leading-[46px] font-semibold !text-content text-sm hover:!text-primary hover:drop-shadow"
                                >
                                    Art
                                </Link>
                            </Dropdown>

                            <Dropdown menu={{ items: about }}>
                                <Link
                                    href={''}
                                    className="uppercase block leading-[46px] font-semibold !text-content text-sm hover:!text-primary hover:drop-shadow"
                                >
                                    About
                                </Link>
                            </Dropdown>
                        </Space>

                        {/* Nav  end */}

                        {/* Action start */}

                        <ul className="flex items-center gap-x-4">
                            <li>
                                <Link href={''} className="flex font-semibold text-primary gap-x-2">
                                    <span>
                                        <ShopFilled />
                                    </span>
                                    <span>SHOP</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/login'} className="">
                                    LOGIN / REGISTER
                                </Link>
                            </li>
                            <li className="relative">
                                <Link href={'/my-favourite'}>
                                    <HeartOutlined className="text-content text-xl" />
                                    <span className="bg-primary -right-2 -top-2 rounded-full text-white absolute w-4 text-center leading-4 h-4">
                                        0
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <DrawerCart />
                            </li>
                        </ul>
                    </div>

                    {/* Action end */}
                </motion.div>

                {/* Mobile Interface start */}
                <motion.div
                    animate={offset > headerHeight ? { height: 60, position: 'fixed', zIndex: 999999 } : { height: 60 }}
                    className={`flex justify-between top-0 left-0 right-0 bg-white lg:hidden items-center h-[60px] shadow-sm`}
                >
                    {/* Mobile Menu Drawer start */}
                    <DrawerMobileMenu />
                    {/* Mobile Menu Drawer end */}

                    <Image src={'/logo.webp'} alt="logo" width={180} height={36} />

                    <DrawerCart />
                </motion.div>
                {/* Mobile Interface end */}
            </div>
        </div>
    );
};

export default Header;
