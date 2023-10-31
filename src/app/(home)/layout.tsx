import { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from '@/components/component/header/Header';

type Props = {
    children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return (
        <Layout className="bg-white">
            <Header />
            {children}
        </Layout>
    );
};

export default MainLayout;
