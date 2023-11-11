import { FolderOutlined, MenuOutlined, SearchOutlined, ShopOutlined } from '@ant-design/icons';
import { Drawer, Menu, MenuProps, Tabs } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

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

const items: MenuProps['items'] = [
    getItem(
        <Link className="text-sm py-4 !text-white font-semibold uppercase block hover:text-white" href={''}>
            News & Events
        </Link>,
        'sub1',
        null,
        [
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    News
                </Link>,
                'g1',
            ),
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    Latest Game Merchandise
                </Link>,
                'g2',
            ),
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    Wish Banner
                </Link>,
                'g3',
            ),
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    Promotion Code
                </Link>,
                'g4',
            ),
        ],
    ),

    getItem(
        <Link className="text-sm py-4 !text-white uppercase font-semibold block hover:text-white" href={''}>
            Merch Shop
        </Link>,
        'sub2',
        <ShopOutlined className="!text-lg !text-white" />,
    ),

    getItem(
        <Link className="text-sm py-4 !text-white uppercase font-semibold block hover:text-white" href={''}>
            Characters
        </Link>,
        'sub3',
        null,
        [
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    All Characters
                </Link>,
                '9',
                <FolderOutlined />,
            ),
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    Mondstadt
                </Link>,
                '10',
                <FolderOutlined />,
            ),
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    Liyue
                </Link>,
                '11',
                <FolderOutlined />,
            ),
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    Inazuma
                </Link>,
                '12',
                <FolderOutlined />,
            ),
            getItem(
                <Link className="text-sm py-4 !text-white font-normal block hover:text-white" href={''}>
                    Sumeru
                </Link>,
                '13',
                <FolderOutlined />,
            ),
        ],
    ),
];

const DrawerMobileMenu = ({}: Props) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className="flex p-3 active:opacity-80" onClick={showDrawer}>
                <MenuOutlined className="text-lg" />
            </button>

            <Drawer
                style={{ backgroundColor: 'black', padding: 0, zIndex: 9999, position: 'relative' }}
                closable={false}
                placement="left"
                width={300}
                headerStyle={{ padding: 0 }}
                bodyStyle={{ padding: 0 }}
                title={
                    <div className="w-full relative flex items-center h-[70px] px-2">
                        <input
                            placeholder="Tìm kiếm sản phẩm"
                            required
                            className="w-full bg-transparent outline-none text-nav text-base"
                        />
                        <button type="button" className="absolute text-nav right-0 p-2">
                            <SearchOutlined className="text-lg" />
                        </button>
                    </div>
                }
                open={open}
                onClose={onClose}
            >
                <Tabs defaultActiveKey="1" tabBarStyle={{ display: 'flex', justifyContent: 'center' }}>
                    <TabPane
                        tab={
                            <h1 className="text-center text-sm uppercase hover:text-content transition-all duration-75 w-full">
                                Menu
                            </h1>
                        }
                        key={'1'}
                    >
                        <Menu
                            style={{ backgroundColor: 'transparent' }}
                            className="ant-menu-mobile-custom"
                            mode="inline"
                            theme="dark"
                            items={items}
                        ></Menu>
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
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    OFFICIAL MERCHANDISE
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    OFFICIAL COLLABORATION
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    ACCESSORIES
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    ORNAMENT & DISPLAY
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    STATIONERY
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    TABLEWARE
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    HOME DECOR
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    TOYS
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    COMPUTER & ELECTRONICS
                                </Link>
                            </li>
                            <li className="leading-[50px]">
                                <Link
                                    className="text-sm py-4 !text-white px-5 font-semibold block hover:text-white"
                                    href={''}
                                >
                                    LIGHTING
                                </Link>
                            </li>
                        </ul>
                    </TabPane>
                </Tabs>
            </Drawer>
        </div>
    );
};

export default DrawerMobileMenu;
