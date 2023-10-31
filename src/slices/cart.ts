import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '@prisma/client';

type CartProps = {
    cartItems: any[];
};

const initialState: CartProps = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Product>) => {
            const newProduct = action.payload;

            const existingProduct = state.cartItems.findIndex((item) => item.id === newProduct.id);

            if (existingProduct === -1) {
                state.cartItems.push(newProduct);
            } else {
                state.cartItems[existingProduct].quantity++;
            }
        },
        increase: (state, action: PayloadAction<number>) => {
            const currentProduct = state.cartItems.find((item) => item.id === action.payload);
            currentProduct.quantity++;
        },
        decrease: (state, action: PayloadAction<number>) => {
            const currentProduct = state.cartItems.find((item) => item.id === action.payload);
            currentProduct.quantity--;

            if (currentProduct.quantity < 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
                currentProduct.quantity = 1;
            }
        },
        clear: (state) => {
            state.cartItems = [];
        },
        remove: (state, action: PayloadAction<Product>) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
        },
    },
});

export const { add, increase, decrease, clear, remove } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
