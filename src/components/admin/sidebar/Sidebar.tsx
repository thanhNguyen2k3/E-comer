'use client';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DeleteOutlined,
    AppstoreAddOutlined,
    ControlOutlined,
    RobotOutlined,
    BoldOutlined,
    FolderOutlined,
    FolderAddOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Button } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

const { Sider } = Layout;

type Props = {
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const StyleSidebar = styled(Sider)`
    background-color: #000 !important;
    position: fixed !important;
    z-index: 1;

    .ant-menu-item-selected {
        background-color: #6eb89f;
        border-radius: 0;
        margin: 0;
        width: 100%;
    }

    .ant-layout-sider-children {
        height: 100vh;
        background-color: #000 !important;
    }
`;

const Sidebar = ({ collapsed, setCollapsed }: Props) => {
    let path = usePathname();

    const [current, setCurrent] = useState(
        path === '/admin/dashboard' || path === '/admin/dashboard' ? '/admin/dashboard' : path,
    );

    useEffect(() => {
        if (path) {
            if (current !== path) {
                setCurrent(path);
            }
        }
    }, [path, current]);

    const handleClick = (e: any) => {
        setCurrent(e.key);
    };

    return (
        <StyleSidebar
            trigger={null}
            collapsible
            onCollapse={(value) => setCollapsed(value)}
            collapsed={collapsed}
            theme={`dark`}
            className={`bg-black`}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    position: 'absolute',
                    zIndex: 99,
                    right: 0,
                }}
            />
            <div className="flex justify-center bg-white py-6 px-4 m-0 text-sm whitespace-nowrap  text-slate-700">
                <img src={'../vercel.svg'} className="w-full shadow " alt="" />
            </div>
            <Menu
                onClick={handleClick}
                theme="dark"
                mode="inline"
                className="antd-menu-custom bg-black"
                selectedKeys={[current]}
                items={[
                    {
                        key: 'dashboard',
                        icon: <UserOutlined />,
                        label: <Link href={'/admin/dashboard'}>Quản lý</Link>,
                    },
                    {
                        key: 'products',
                        icon: <VideoCameraOutlined />,
                        label: <Link href={'/admin/products'}>Sản phẩm</Link>,
                        children: [
                            {
                                key: 'create/product',
                                icon: <AppstoreAddOutlined />,
                                label: <Link href={'/admin/products/create'}>Thêm</Link>,
                            },
                        ],
                    },
                    {
                        key: 'options',
                        icon: <VideoCameraOutlined />,
                        label: <label>Options</label>,
                        children: [
                            {
                                key: 'category',
                                icon: <ControlOutlined />,
                                label: <Link href={'/admin/options/categories'}>Danh mục</Link>,
                            },
                            {
                                key: 'brand',
                                icon: <BoldOutlined />,
                                label: <Link href={'/admin/options/brands'}>Thương hiệu</Link>,
                            },
                        ],
                    },
                    {
                        key: 'characters',
                        icon: <FolderAddOutlined />,
                        label: <Link href={'/admin/characters'}>Nhân vật</Link>,
                        children: [
                            {
                                key: 'create/characters',
                                icon: <FolderOutlined />,
                                label: <Link href={'/admin/characters/create'}>Thêm</Link>,
                            },
                            {
                                key: 'characters/regions',
                                icon: <FolderOutlined />,
                                label: <Link href={'/admin/characters/regions'}>Regions</Link>,
                            },
                            {
                                key: 'characters/visions',
                                icon: <FolderOutlined />,
                                label: <Link href={'/admin/characters/visions'}>Visions</Link>,
                            },
                            {
                                key: 'characters/weapons',
                                icon: <FolderOutlined />,
                                label: <Link href={'/admin/characters/weapons'}>Weapons</Link>,
                            },
                        ],
                    },
                    {
                        key: 'orders',
                        icon: <UploadOutlined />,
                        label: <Link href={'/admin/orders'}>Đặt hàng</Link>,
                    },
                    {
                        key: 'trash/product',
                        icon: <DeleteOutlined />,
                        label: <Link href={'/admin/trash/product'}>Thùng rác</Link>,
                    },
                    {
                        key: 'trash/order',
                        icon: <DeleteOutlined />,
                        label: <Link href={'/admin/trash/order'}>Đơn hàng (xóa)</Link>,
                    },
                ]}
            />
        </StyleSidebar>
    );
};

export default Sidebar;
