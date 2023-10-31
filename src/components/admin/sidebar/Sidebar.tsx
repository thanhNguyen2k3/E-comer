'use client';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, DeleteOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar } from 'antd';
import Link from 'next/link';

const { Sider } = Layout;

type Props = {
    collapsed: boolean;
};

const Sidebar = ({ collapsed }: Props) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} theme={`light`} className="h-screen">
            <div className="flex justify-center py-6 px-4 m-0 text-sm whitespace-nowrap text-slate-700">
                <img src={'../vercel.svg'} className="w-full shadow " alt="" />
            </div>
            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <UserOutlined />,
                        label: <Link href={'/admin/dashboard'}>Quản lý</Link>,
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined />,
                        label: <Link href={'/admin/products'}>Sản phẩm</Link>,
                    },
                    {
                        key: '3',
                        icon: <UploadOutlined />,
                        label: <Link href={'/admin/orders'}>Đặt hàng</Link>,
                    },
                    {
                        key: '4',
                        icon: <DeleteOutlined />,
                        label: <Link href={'/admin/trash'}>Thùng rác</Link>,
                    },
                ]}
            />
        </Sider>
    );
};

export default Sidebar;
