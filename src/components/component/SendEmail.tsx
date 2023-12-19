import { ExtandOrder } from '@/types/extend';
import { formartUSD } from '@/utils/formartUSD';

const baseUrl = process.env.NEXT_URL ? `${process.env.NEXT_URL}` : '';

type Props = {
    orderId?: string;
    order?: ExtandOrder;
};

const ShopReceiptEmail = ({ orderId, order }: Props) => {
    return (
        <div className="w-[800px] max-w-full mx-auto border px-4 py-4">
            <div className="bg-gray-100 flex justify-between px-4 items-center border-b border-gray-300 py-4">
                <div className="space-y-1">
                    <span className="font-semibold">Mã Đơn Hàng</span>
                    <p className="text-gray-500">{orderId}</p>
                </div>

                <a href={`${baseUrl}`} className="border border-gray-400 py-4 px-6 font-semibold">
                    Theo dõi
                </a>
            </div>

            <div className="flex justify-center flex-col items-center space-y-4 border-b border-gray-300 py-6">
                <img src={`${baseUrl}/logo.webp`} width={160} alt="" />

                <h1 className="text-3xl font-bold">Cảm ơn khách hàng đã ủng hộ</h1>

                <p>Đơn hàng của bạn đang được xác nhận bởi Shop</p>

                <p>
                    Chúng tôi cũng đã tính phí đơn hàng của bạn vào phương thức thanh toán của bạn và sẽ xóa mọi khoản
                    giữ ủy quyền. Để biết chi tiết thanh toán.
                </p>
            </div>

            <div className="border-b border-gray-300 py-4 space-y-1">
                <h1 className="font-semibold text-base ">Giao hàng tới: {order?.address}</h1>
                <p className="font-semibold text-nav">{order?.detailAddress}</p>
            </div>

            <div className="mt-5 sm:mt-10">
                <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-gray-200">Đơn hàng</h4>

                <ul className="mt-3 flex flex-col">
                    {order?.orderItems.map((product, index) => (
                        <li
                            key={index}
                            className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-slate-800 dark:border-gray-700 dark:text-gray-200"
                        >
                            <div className="flex items-center justify-between w-full line-clamp-2">
                                <span className="font-normal mr-6">
                                    {product.name} x <strong>{product.quantity}</strong>
                                </span>
                                <span>{formartUSD(product.product.price * product.quantity)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShopReceiptEmail;
