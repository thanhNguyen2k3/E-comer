import { MenuOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Collapse, CollapseProps, Drawer, List, Tabs, TabsProps } from 'antd';
import { useState } from 'react';

type Props = {};

const { TabPane } = Tabs;

const DrawerMobileMenu = ({}: Props) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const text = ``;

    return (
        <div>
            <button className="flex p-3 active:opacity-80" onClick={showDrawer}>
                <MenuOutlined className="text-lg" />
            </button>

            <Drawer
                style={{ backgroundColor: 'black', padding: 0 }}
                closable={false}
                placement="left"
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
                        tab={<h1 className="text-center hover:text-content transition-all duration-75 w-full">Menu</h1>}
                        key={'1'}
                    >
                        <ul>
                            <li className="text-white pl-2">
                                <div className="flex items-center justify-between">
                                    <h1>Navigation</h1>
                                    <button className="hover:opacity-60 px-3 py-2">
                                        <RightOutlined />
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </TabPane>
                    <TabPane
                        tab={
                            <h1 className=" text-center hover:text-content transition-all duration-75 w-full">
                                Danh mục
                            </h1>
                        }
                        key={'2'}
                    >
                        Heelo 2
                    </TabPane>
                </Tabs>
            </Drawer>
        </div>
    );
};

export default DrawerMobileMenu;
