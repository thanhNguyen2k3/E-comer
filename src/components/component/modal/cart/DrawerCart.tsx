import { ShoppingCartOutlined } from '@ant-design/icons';

type Props = {};

const DrawerCart = ({}: Props) => {
    return (
        <div>
            <button className="flex relative p-3 active:opacity-80">
                <ShoppingCartOutlined className="text-xl" />
                <span className="absolute top-1 right-1 bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center">
                    0
                </span>
            </button>
        </div>
    );
};

export default DrawerCart;
