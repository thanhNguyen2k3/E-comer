import { ShoppingCartOutlined } from '@ant-design/icons';
import { Divider, Drawer } from 'antd';
import { useState } from 'react';
import CartItem from './item/CartItem';

type Props = {};

const DrawerCart = ({}: Props) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const items = [...new Array(4)];

    return (
        <div>
            <button className="flex relative p-3 active:opacity-80" onClick={showDrawer}>
                <ShoppingCartOutlined className="text-xl" />
                <span className="absolute top-1 right-1 bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center">
                    0
                </span>
            </button>

            <Drawer
                style={{ zIndex: 9999999 }}
                title="Giỏ hàng"
                placement="right"
                width={300}
                onClose={onClose}
                open={open}
            >
                <ul className="flex flex-col gap-y-2">
                    {items.map((_item, index) => (
                        <li key={index}>
                            <CartItem />
                            {items.length > 1 && <Divider className="my-3" />}
                        </li>
                    ))}
                </ul>
            </Drawer>
        </div>
    );
};

export default DrawerCart;
