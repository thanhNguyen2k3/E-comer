import { ReactNode } from 'react';
import { Layout } from 'antd';
import Header from '@/components/component/header/Header';
import FooterFn from '@/components/component/footer/FooterFn';

type Props = {
    children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
    return (
        <Layout className="bg-white">
            {/* <ScrollAnimation /> */}
            <Header />
            <div className="pb-20">{children}</div>
            <FooterFn />
        </Layout>
    );
};

export default MainLayout;
