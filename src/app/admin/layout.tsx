'use client';

import { ReactNode, useEffect, useState } from 'react';
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

    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <Layout className="sticky">
                <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout>
                    <AdminHeader
                        colorBgContainer={colorBgContainer}
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <div className={`${collapsed ? 'ml-[80px]' : 'ml-[80px]'} transition-all`}>{children}</div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
};

export default LayoutAdmin;
