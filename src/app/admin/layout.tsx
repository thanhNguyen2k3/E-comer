'use client';

import { ReactNode, useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from '@/components/admin/sidebar/Sidebar';
import AdminHeader from '@/components/admin/header/AdminHeader';

const { Content } = Layout;

type Props = {
    children: ReactNode;
};

const LayoutAdmin = ({ children }: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="sticky">
            <Sidebar collapsed={collapsed} />
            <Layout>
                <AdminHeader colorBgContainer={colorBgContainer} collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
