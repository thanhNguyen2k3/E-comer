import { ExtandProduct } from '@/types/extend';

export const totalAmount = (cartItems: ExtandProduct[]) => {
    return cartItems.reduce((sum: number, item: any) => {
        return sum + item.price * item.quantity;
    }, 0);
};
