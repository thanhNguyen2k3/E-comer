'use client';

import { CloseOutlined } from '@ant-design/icons';

type Props = {};

const Page = ({}: Props) => {
    return (
        <div className="max-w-full w-layout mx-auto">
            <div className="grid lg:grid-cols-3 grid-cols-1 py-10 lg:px-0 lg:pr-2">
                <div className="col-span-2 p-4 text-nav">
                    <table className="font-medium lg:block md:block hidden table-auto">
                        <thead className="text-base">
                            <tr className="border-b">
                                <th></th>
                                <th></th>
                                <th className="px-4 text-left uppercase font-semibold text-nav py-4">Sản phẩm</th>
                                <th className="px-2 uppercase font-semibold text-nav py-4">Giá</th>
                                <th className="px-2 uppercase font-semibold text-nav py-4">Số</th>
                                <th className="uppercase font-semibold text-nav py-4">Tổng</th>
                            </tr>
                        </thead>
                        <tbody className="border-b-2 border-gray-300">
                            <tr className="text-sm">
                                <td>
                                    <button className="p-3">
                                        <CloseOutlined />
                                    </button>
                                </td>
                                <td>
                                    <img
                                        className="lg:min-w-[80px] lg:min-h-[80px] w-[65px] h-[65px]"
                                        src="/abyss.webp"
                                        alt=""
                                    />
                                </td>
                                <td className="px-4 w-full py-8">
                                    Honkai: Star Rail The Hunt Character Acrylic Stand - Yanqing
                                </td>
                                <td className="px-2 py-8">$24.99</td>
                                <td className="px-2 py-8">
                                    <div className="min-w-[80px] max-w-[80px] flex">
                                        <button className="border border-b px-2 py-2">-</button>
                                        <input
                                            type="number"
                                            className="outline-none w-full px-1 border text-center"
                                            min={1}
                                        />
                                        <button className="border px-2 py-2">+</button>
                                    </div>
                                </td>
                                <td className="px-2 py-8">
                                    <p className="text-primary text-base">$99.96</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="lg:hidden md:hidden flex font-medium gap-x-3">
                        <img className="col-span-1 max-w-[100px] max-h-[100px]" src="/abyss.webp" alt="" />
                        <div className="col-span-2 flex flex-col justify-between flex-1 text-sm">
                            <div className="flex justify-between items-center">
                                <span>Honkai: Star Rail The Hunt Character Acrylic Stand - Yanqing</span>
                                <button className="p-3">
                                    <CloseOutlined />
                                </button>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 py-2">
                                <span>Giá</span>
                                <span className="">$24.99</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-100 py-2">
                                <span>Số lượng</span>
                                <div>
                                    <div className="min-w-[90px] max-w-[90px] flex">
                                        <button className="border border-b px-2 py-1">-</button>
                                        <input
                                            type="number"
                                            className="outline-none w-full px-1 border text-center"
                                            min={1}
                                        />
                                        <button className="border px-2 py-1">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Tổng giá</span>
                                <span className="text-primary">$99.96</span>
                            </div>
                        </div>
                    </div>

                    {/* Apply Coupon */}
                    <br />
                    <div className="lg:flex md:flex space-y-4 lg:space-y-0 block flex-row-reverse justify-between items-center">
                        <button className="bg-gray-200 opacity-80 hover:opacity-100 transition-all shadow text-sub px-3 py-2 uppercase">
                            Cập nhật giỏ hàng
                        </button>
                        <div className="border-dashed border lg:border-0 md:border-0 p-6 flex border-gray-300">
                            <input
                                type="text"
                                className="border w-2/3 lg:w-auto md:w-auto outline-none px-2 py-2"
                                placeholder="Mã giảm giá"
                            />
                            <button className="ml-2 font-semibold bg-primary w-1/3 lg:w-auto md:w-auto px-2 py-2 text-white">
                                ÁP MÃ GIẢM GIÁ
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 px-4 lg:px-0">
                    <div className="border-2 border-gray-200 rounded space-y-6 p-5 font-semibold text-sm text-nav">
                        <h1 className="uppercase text-xl">TỔNG GIỎ HÀNG</h1>

                        <div className="flex flex-col justify-between gap-y-6">
                            <div className="flex justify-between items-center border-b border-gray-200 py-3">
                                <span>Tổng phụ</span>
                                <span>$99.96</span>
                            </div>

                            <div className="flex justify-between items-center border-b border-gray-200 py-3">
                                <p>Shipping</p>
                                <div className="grid grid-cols-1 place-items-end space-y-3 place-content-center">
                                    <div className="space-x-2">
                                        <label>
                                            Tiêu chuẩn <span className="text-primary">$25.00</span>
                                        </label>
                                        <input type="radio" name="method" id="" />
                                    </div>
                                    <div className="space-x-2">
                                        <label>
                                            Nhanh <span className="text-primary">$25.00</span>
                                        </label>
                                        <input type="radio" name="method" id="" />
                                    </div>
                                    <p className="font-normal">
                                        Shipping to <span className="font-semibold">Vietnam</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-xl py-2">
                                <p>Tổng</p>
                                <p className="text-primary">$159.96</p>
                            </div>

                            <button className="text-white bg-primary py-2">TIẾN HÀNH KIỂM TRA</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
