import Bill from '@/components/component/Bill';
import BillBoard from '@/components/local/BillBoard';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { formartUSD } from '@/utils/formartUSD';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Collapse, CollapseProps } from 'antd';
import Link from 'next/link';

const {} = Collapse;

const Page = async () => {
    const session = await getAuthSession();

    const orders = await db.order.findMany({
        where: {
            userId: session?.user.id,
            isPaid: true,
        },
        include: {
            user: true,
            orderItems: {
                include: {
                    product: true,
                },
            },
        },
    });

    const items: CollapseProps['items'] = orders.map((order) => ({
        key: order.id,
        label: `Đơn hàng - ${order.createdAt.toLocaleDateString()}`,
        children: (
            <div className="overflow-x-auto">
                <table className="border min-w-[500px]">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="text-left">Sản phẩm</th>
                            <th className="line-clamp-1 min-w-[100px] text-center">Số lượng</th>
                            <th className="min-w-[100px] text-center">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderItems.map((item) => (
                            <tr className="border" key={item.id}>
                                <td className="p-2">
                                    <img
                                        src={`/uploads/${item.product.images![0]}`}
                                        className="min-w-[50px] min-h-[50px]"
                                        alt=""
                                    />
                                </td>
                                <td className="p-2 w-full">{item.name}</td>
                                <td className="p-2 text-center">{item.quantity}</td>
                                <td className="p-2 text-center">{formartUSD(item.product.price * item.quantity)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ),
    }));

    return (
        <div>
            {orders.length === 0 ? (
                <div className="bg-[#E0B252] px-4 py-4 text-white flex">
                    <InfoCircleOutlined className="text-lg mr-3" />
                    <p>
                        <span className="text-sm">Chưa có đơn đặt hàng nào được thực hiện.</span>
                        <Link href={'/'} className="text-base font-semibold">
                            TRANG CHỦ
                        </Link>
                    </p>
                </div>
            ) : (
                <Collapse items={items} bordered={false} defaultActiveKey={items[0].id} />
            )}
        </div>
    );
};

export default Page;
