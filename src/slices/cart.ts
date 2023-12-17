import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '@prisma/client';
import { message } from 'antd';
import { ExtandProduct } from '@/types/extend';

type CartProps = {
    cartItems: any[];
};

type PickUp = Pick<
    ExtandProduct,
    | 'name'
    | 'images'
    | 'price'
    | 'id'
    | 'quantity'
    | 'saleOff'
    | 'categoryId'
    | 'description'
    | 'category'
    | 'shortDes'
    | 'options'
>;

const initialState: CartProps = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<PickUp & { extraSelected?: string | null }>) => {
            let newProduct = action.payload;

            const itemIndex = state.cartItems.findIndex((item) => item?.extraSelected === newProduct.extraSelected);

            const existingProduct = state.cartItems.find((item) => item.id === newProduct.id);

            // const itemIndex = state.cartItems.findIndex((item) => item?.id === newProduct.id);
            // const existingProduct = state.cartItems.find((item) => item.id === newProduct.id);

            // if (itemIndex === -1) {
            //     state.cartItems.push({
            //         ...newProduct,
            //         quantity: newProduct.quantity || 1,
            //         selected: [...newProduct.selected!],
            //     });
            //     message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
            // } else {
            //     if (existingProduct) {
            //         existingProduct.quantity++;
            //     } else if (existingProduct && newProduct.quantity) {
            //         existingProduct.quantity = newProduct.quantity;
            //     }
            //     state.cartItems[itemIndex]?.selected?.push(...newProduct.selected!);

            //     message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
            // }

            if (itemIndex < 0) {
                state.cartItems.push({
                    ...newProduct,
                    extraSelected: newProduct.extraSelected,
                    quantity: newProduct.quantity || 1,
                });
                message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
            } else if (itemIndex === 0 && existingProduct?.extraSelected !== newProduct.extraSelected) {
                state.cartItems.push({
                    ...newProduct,
                    extraSelected: newProduct.extraSelected,
                    quantity: newProduct.quantity || 1,
                });
                message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
            } else if (itemIndex === 0 && existingProduct?.extraSelected === newProduct.extraSelected) {
                state.cartItems[itemIndex].quantity++;
                message.info(`${newProduct.name} đã có trong giỏ hàng`);
            } else if (!newProduct.extraSelected) {
                if (existingProduct) {
                    message.info(`${newProduct.name} đã có trong giỏ hàng`);
                } else {
                    state.cartItems.push({ ...newProduct, extraSelected: newProduct.extraSelected, quantity: 1 });
                    message.success(`Đã thêm ${newProduct.name} vào giỏ hàng`);
                }
            }
        },
        increase: (state, action: PayloadAction<number>) => {
            const currentProduct = state.cartItems.find((_item, index) => index === action.payload);
            currentProduct.quantity++;
        },
        decrease: (state, action: PayloadAction<number>) => {
            const currentProduct = state.cartItems.find((_item, index) => index === action.payload);
            currentProduct.quantity--;

            if (currentProduct.quantity < 1) {
                state.cartItems = state.cartItems.filter((_item, index) => index !== action.payload);
                currentProduct.quantity = 1;

                message.info(`${currentProduct.name} đã được loại bỏ`);
            }
        },
        clear: (state) => {
            state.cartItems = [];

            message.info(`Giỏ hàng đã được làm trống`);
        },
        remove: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((_item, index) => index !== action.payload);

            message.info(`Đã xóa sản phẩm khỏi giỏ hàng`);
        },
        update: (state, action) => {
            state.cartItems = action.payload;
            message.info(`Giỏ hàng đã được cập nhật`);
        },
    },
});

export const { add, increase, decrease, clear, remove, update } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
