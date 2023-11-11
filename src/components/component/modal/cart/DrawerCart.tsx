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
                footer={
                    <div className="space-y-3 text-base font-semibold">
                        <div className="flex justify-between">
                            <h1>Tổng phụ:</h1>
                            <span className="text-primary">199$</span>
                        </div>
                        <button className="uppercase text-sm w-full px-2 shadow-lg py-2 hover:opacity-90 h-full transition-all">
                            Xem giỏ hàng
                        </button>
                        <button className="uppercase text-sm w-full px-2 shadow-lg py-2 h-full bg-primary text-white hover:bg-secondary transition-all">
                            Thanh toán
                        </button>
                    </div>
                }
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
