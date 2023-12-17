'use client';

import { useAppSelector } from '@/store/hook';
import { formartUSD } from '@/utils/formartUSD';
import { totalAmount } from '@/utils/reduceTotal';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    deliveryMoney?: number;
    deliveryMethod?: number;
    setDeliveryMoney?: Dispatch<SetStateAction<number>>;
    setDeliveryMethod?: Dispatch<SetStateAction<number>>;
};

const BillBoard = ({ deliveryMethod, deliveryMoney, setDeliveryMethod, setDeliveryMoney }: Props) => {
    const { cartItems } = useAppSelector((state) => state.cart);

    return (
        <>
            <div className="flex justify-between items-center border-b border-gray-200 py-3">
                <span>Tổng phụ</span>
                <span>{formartUSD(totalAmount(cartItems))}</span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 py-3">
                <p>Shipping</p>
                <div className="grid grid-cols-1 place-items-end space-y-3 place-content-center">
                    <div className="space-x-2">
                        <label>
                            Tiêu chuẩn <span className="text-primary">{formartUSD(25000)}</span>
                        </label>
                        <input
                            type="radio"
                            name="method"
                            defaultChecked
                            value={1}
                            onChange={(e) => {
                                setDeliveryMoney!(25000);
                                setDeliveryMethod!(Number(e.target.value));
                            }}
                        />
                    </div>
                    <div className="space-x-2">
                        <label>
                            Nhanh <span className="text-primary">{formartUSD(40000)}</span>
                        </label>
                        <input
                            type="radio"
                            name="method"
                            value={2}
                            onChange={(e) => {
                                setDeliveryMoney!(40000);
                                setDeliveryMethod!(Number(e.target.value));
                            }}
                        />
                    </div>
                    <p className="font-normal">
                        Shipping to <span className="font-semibold">Vietnam</span>
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center text-xl py-2">
                <p>Tổng</p>
                <p className="text-primary">{formartUSD(totalAmount(cartItems) + deliveryMoney!)}</p>
            </div>
        </>
    );
};

export default BillBoard;
