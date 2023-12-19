'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from '@/components/admin/sidebar/Sidebar';
import AdminHeader from '@/components/admin/header/AdminHeader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const { Content } = Layout;

type Props = {
    children: ReactNode;
};

const LayoutAdmin = ({ children }: Props) => {
    const router = useRouter();
    const { data, status } = useSession();

    const [showChild, setShowChild] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        setShowChild(true);
    }, []);

    useEffect(() => {
        if (data?.user.isAdmin) {
            return;
        } else {
            router.push('/admin/login');
        }
    }, [router, data]);

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
