import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    colorBgContainer: string;
    collapsed: boolean;
    setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const AdminHeader = ({ colorBgContainer, collapsed, setCollapsed }: Props) => {
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    );
};

export default AdminHeader;
