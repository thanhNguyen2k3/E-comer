import {
    FolderOutlined,
    MenuOutlined,
    SearchOutlined,
    ShopOutlined,
    LoadingOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { Drawer, Menu, MenuProps, Tabs } from 'antd';
import Link from 'next/link';
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import instance from '@/lib/axios';
import { useDebounce } from '@/hooks/useDebounce';
import { ExtandProduct } from '@/types/extend';
import { Image } from 'antd';
import { formartUSD } from '@/utils/formartUSD';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

type Props = {};

const { TabPane } = Tabs;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const StyleDrawer = styled(Drawer)`
    .ant-drawer-header {
        padding: 0;
    }

    .ant-drawer-body {
        padding: 0;
    }
`;

const StyleTabs = styled(Tabs)`
    .ant-tabs-nav {
        &::before {
            border-color: transparent;
        }
    }

    .ant-tabs-nav-wrap {
        flex: 1 !important;
        width: 100%;
        .ant-tabs-nav-list {
            width: 100%;
            flex: 1;

            .ant-tabs-tab {
                width: 50%;

                .ant-tabs-tab-btn {
                    color: #fff;
                    text-align: center;
                    width: 100%;
                }
            }

            .ant-tabs-ink-bar {
                background-color: #6eb89f;
            }
        }
    }
`;

const StyleSubMenu = styled(Menu)`
    background-color: #000;

    .ant-menu-submenu-arrow {
        color: #fff;
    }

    .ant-menu-item-selected {
        background-color: #000 !important;
    }

    .ant-menu-item-selected .ant-menu-title-content {
        color: #000;
    }
    .ant-menu {
        .ant-menu-submenu .ant-menu-submenu-inline .ant-menu-submenu-open {
            &:focus-visible {
                border-color: #000 !important;
            }
        }

        .ant-menu-item {
            padding-left: 24px !important;
        }

        .ant-menu-item-icon {
            color: #fff;
            font-size: 20px;
        }

        .ant-menu-item-selected {
            background-color: transparent;
        }
    }
`;

const DrawerMobileMenu = ({}: Props) => {
    const { status } = useSession();

    const items: MenuProps['items'] = [
        getItem(
            <Link className="text-sm py-4 !text-white font-semibold uppercase block hover:text-white" href={'/'}>
                News & Events
            </Link>,
            'sub1',
            null,
            [
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        News
                    </Link>,
                    'g1',
                ),
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        Latest Game Merchandise
                    </Link>,
                    'g2',
                ),
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        Wish Banner
                    </Link>,
                    'g3',
                ),
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        Promotion Code
                    </Link>,
                    'g4',
                ),
            ],
        ),

        getItem(
            <Link className="text-sm py-4 !text-white uppercase font-semibold block hover:text-white" href={'/shop'}>
                Merch Shop
            </Link>,
            'sub2',
            <ShopOutlined className="!text-lg !text-white" />,
        ),

        getItem(
            <Link className="text-sm py-4 !text-white uppercase font-semibold block hover:text-white" href={'/'}>
                Characters
            </Link>,
            'sub3',
            null,
            [
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        All Characters
                    </Link>,
                    '9',
                    <FolderOutlined />,
                ),
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        Mondstadt
                    </Link>,
                    '10',
                    <FolderOutlined />,
                ),
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        Liyue
                    </Link>,
                    '11',
                    <FolderOutlined />,
                ),
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        Inazuma
                    </Link>,
                    '12',
                    <FolderOutlined />,
                ),
                getItem(
                    <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={'/'}>
                        Sumeru
                    </Link>,
                    '13',
                    <FolderOutlined />,
                ),
            ],
        ),

        getItem(
            status !== 'authenticated' ? (
                <Link
                    className="text-sm py-4 !text-white font-normal block uppercase hover:text-white"
                    href={'/my-account/dashboard'}
                >
                    Login/Register
                </Link>
            ) : (
                <Link
                    className="text-sm py-4 !text-white font-normal block uppercase hover:text-white"
                    href={'/my-account/dashboard'}
                >
                    My Account
                </Link>
            ),
            'my-account',
            null,
            [
                {
                    key: 'dashboard',
                    label: (
                        <Link className="!text-white" href={'/my-account/dashboard'}>
                            Dashboard
                        </Link>
                    ),
                },
                {
                    key: 'orders',
                    label: (
                        <Link className="!text-white" href={'/my-account/orders'}>
                            Orders
                        </Link>
                    ),
                },
                {
                    key: 'details',
                    label: (
                        <Link className="!text-white" href={'/my-account/details'}>
                            Account details
                        </Link>
                    ),
                },
                {
                    key: 'wishlist',
                    label: (
                        <Link className="!text-white" href={'/my-account/dashboard'}>
                            Wishlist
                        </Link>
                    ),
                },
                {
                    key: 'logout',
                    label: (
                        <button className="text-white" onClick={() => signOut()}>
                            Logout
                        </button>
                    ),
                },
            ],
        ),
    ];

    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');
    const [data, setData] = useState<ExtandProduct[]>([]);
    const [showData, setShowData] = useState(true);

    const debounce = useDebounce(input, 1000);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const shouldLog = useRef(true);

    const makeRequest = async () => {
        try {
            setLoading(true);

            if (input === '') {
                setData([]);
            } else {
                const res = await instance.get(`/api/pl/search?q=${encodeURIComponent(input)}`);
                setData(res.data);
            }
        } catch (error) {
            setLoading(true);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setInput(target.value);
    };

    const handleClear = () => {
        setInput('');
        setData([]);
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (shouldLog.current) {
            shouldLog.current = false;
        } else {
            if (debounce?.length === 0) {
                setShowData(false);
                setData([]);
            } else {
                setShowData(true);
                makeRequest();
            }
        }
    }, [debounce]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/shop/search-result?q=${input}`);
        setOpen(false);
    };

    return (
        <div>
            <button className="flex active:opacity-80" onClick={showDrawer}>
                <MenuOutlined className="text-lg" />
            </button>

            <StyleDrawer
                style={{ backgroundColor: 'black', padding: 0, zIndex: 9999, position: 'relative' }}
                closable={false}
                placement="left"
                width={300}
                title={
                    <div className="w-full relative flex items-center h-[70px]">
                        <form onSubmit={handleSubmit} action={`/shop/search-result?q=${input}`}>
                            <div className="flex items-center">
                                <label className="flex items-center px-2">
                                    <input
                                        onChange={handleChange}
                                        value={input}
                                        placeholder="Tìm kiếm sản phẩm"
                                        required
                                        className="w-full bg-transparent outline-none text-nav text-base"
                                    />
                                    {input.length > 0 && (
                                        <button type="button" onClick={handleClear}>
                                            <CloseCircleOutlined className="text-base text-nav" />
                                        </button>
                                    )}
                                </label>
                                <button type="submit" className="absolute text-nav right-0 p-3">
                                    {loading ? (
                                        <LoadingOutlined className="text-lg" />
                                    ) : (
                                        <SearchOutlined className="text-lg" />
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="bg-white left-0 right-0 absolute z-10 grid grid-cols-1 top-full max-h-[375px] overflow-y-auto">
                            {showData &&
                                data?.length > 0 &&
                                data.map((product) => {
                                    const sale = product.price - (product.price * product?.saleOff!) / 100;
                                    return (
                                        <div key={product.id} className="pt-4 pb-4 px-4 border-b border-gray-200">
                                            <div className="flex gap-x-2 text-xs">
                                                <img
                                                    width={45}
                                                    height={45}
                                                    src={`/uploads/${product.images![0]}`}
                                                    alt="product"
                                                />
                                                <div>
                                                    <Link
                                                        href={`/single/${product.category?.slug}/${product.slug}`}
                                                        onClick={onClose}
                                                        className="font-semibold line-clamp-2 mr-1"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                    <p className="font-semibold mt-1">
                                                        {product.saleOff ? (
                                                            <>
                                                                <span className="text-primary">{formartUSD(sale)}</span>
                                                                <span className="line-through text-gray-400 ml-1">
                                                                    {formartUSD(product.price)}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-primary">
                                                                {formartUSD(product.price)}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                }
                open={open}
                onClose={onClose}
            >
                <StyleTabs defaultActiveKey="1" tabBarStyle={{ display: 'flex', justifyContent: 'center' }}>
                    <TabPane
                        tab={
                            <h1 className="text-center text-sm uppercase hover:text-content transition-all duration-75 w-full">
                                Menu
                            </h1>
                        }
                        key={'1'}
                    >
                        <StyleSubMenu
                            // className="ant-menu-mobile-custom"
                            mode="inline"
                            theme="dark"
                            items={items}
                        ></StyleSubMenu>
                    </TabPane>
                    <TabPane
                        tab={
                            <h1 className=" text-center text-sm uppercase hover:text-content transition-all duration-75 w-full">
                                Danh mục
                            </h1>
                        }
                        key={'2'}
                    >
                        <ul>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    OFFICIAL MERCHANDISE
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    OFFICIAL COLLABORATION
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    ACCESSORIES
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    ORNAMENT & DISPLAY
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    STATIONERY
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    TABLEWARE
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    HOME DECOR
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    TOYS
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    COMPUTER & ELECTRONICS
                                </Link>
                            </li>
                            <li className="leading-[50px]" onClick={onClose}>
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={'/'}
                                >
                                    LIGHTING
                                </Link>
                            </li>
                        </ul>
                    </TabPane>
                </StyleTabs>
            </StyleDrawer>
        </div>
    );
};

export default DrawerMobileMenu;
