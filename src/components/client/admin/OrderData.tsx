'use client';

import ButtonComponent from '@/components/local/Button';
import instance from '@/lib/axios';
import { StatusEnum } from '@/types/enum';
import { ExtandOrder } from '@/types/extend';
import { formartUSD } from '@/utils/formartUSD';
import {
    DeleteOutlined,
    DoubleRightOutlined,
    EditOutlined,
    ExclamationCircleFilled,
    PrinterOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { Order, OrderItem, Product, User } from '@prisma/client';
import {
    Button,
    Input,
    InputRef,
    Modal,
    Space,
    Table,
    Form,
    Typography,
    Popconfirm,
    Select,
    message,
    Tooltip,
} from 'antd';
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface';
import { useRouter } from 'next/navigation';
import { FC, HTMLAttributes, Key, ReactNode, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

const { confirm } = Modal;
const { Option } = Select;

interface EditableCellProps extends HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Order;
    index: number;
    children: ReactNode;
}

const renderStatus = (status: number) => {
    if (status === StatusEnum.ORDER_UNCONFIRM) return <span>PENDING</span>;
    if (status === StatusEnum.ORDER_CONFIRM) return <span>CONFIRM</span>;
    if (status === StatusEnum.ORDER_SHIPPING) return <span>SHIPPING</span>;
    if (status === StatusEnum.ORDER_COMPLETE) return <span>COMPLETE</span>;
    if (status === StatusEnum.ORDER_CANCELLED) return <span className="text-red-500">CANCELLED</span>;
};

const EditableCell: FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode =
        dataIndex === 'isPaid' ? (
            <Select>
                <Option value={1}>Thành công</Option>
                <Option value={0}>Thất bại</Option>
            </Select>
        ) : (
            <Select>
                <Option disabled={record?.status >= StatusEnum.ORDER_UNCONFIRM} value={StatusEnum.ORDER_UNCONFIRM}>
                    PENDING
                </Option>
                <Option disabled={record?.status >= StatusEnum.ORDER_CONFIRM} value={StatusEnum.ORDER_CONFIRM}>
                    CONFIRM
                </Option>
                <Option disabled={record?.status >= StatusEnum.ORDER_SHIPPING} value={StatusEnum.ORDER_SHIPPING}>
                    SHIPPING
                </Option>
                <Option disabled={record?.status >= StatusEnum.ORDER_COMPLETE} value={StatusEnum.ORDER_COMPLETE}>
                    COMPLETE
                </Option>
            </Select>
        );

    return (
        <td {...restProps}>
            {editing ? (
                <>
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>

                    {/* <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {statuses}
                    </Form.Item> */}
                </>
            ) : (
                children
            )}
        </td>
    );
};

type Props = {
    orders: ExtandOrder[];
};

type ExtandOrderItem = OrderItem & {
    product: Product;
    user: User;
};

type DataIndex = keyof ExtandOrder;

const OrderData = ({ orders }: Props) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const ref = useRef();

    //state start
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const [editingKey, setEditingKey] = useState('');
    // Selected id
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    // state end

    // Ref start
    const searchInput = useRef<InputRef>(null);
    //Ref end

    // Handle

    const hasSelected = selectedRowKeys.length > 0;

    const onSelectChange = (newSelectedRowKeys: Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const showDeleteConfirm = (record: Order) => {
        const { id } = record;

        confirm({
            title: <p>Bạn có muốn xóa đơn hàng này</p>,
            icon: <ExclamationCircleFilled />,
            content: <p>Đơn hàng sẽ được chuyển vào thùng rác.😉</p>,
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                const { status } = await instance.patch(`/api/pr/order/${record.id}/soft-delete`, {
                    deleted: true,
                });
                if (status === 200) {
                    router.refresh();
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    // Edit row start

    const isEditing = (record: Order) => record.id === editingKey;

    const edit = (record: Partial<Order>) => {
        form.setFieldsValue({ isPaid: record.isPaid ? 'Thành công' : 'Thất bại', status: record.status });
        setEditingKey(record.id!);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id: string) => {
        try {
            const row = (await form.validateFields()) as Order;

            const newData = [...orders];

            if (row.status === StatusEnum.ORDER_CONFIRM) {
                await instance
                    .patch(`/api/pr/order/${id}`, {
                        status: row.status,
                    })
                    .then(() => {
                        message.success('Cập nhật thành công');
                        router.refresh();
                    });
            }

            const index = newData.findIndex((item) => id === item.id);

            if (index > -1) {
                const item = newData[index];

                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                setEditingKey('');
            } else {
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    // Edit row end
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ExtandOrder> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="default"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) =>
            (record as any)[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: any[] = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'fullName',
            key: 'fullName',
            width: '20%',
            render: (record: string) => {
                return record;
            },
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (record: number) => renderStatus(record),
            editable: true,
        },
        {
            title: 'PAID',
            dataIndex: 'isPaid',
            key: 'isPaid',
            width: '10%',
            render: (record: boolean) => {
                return record ? (
                    <span className="text-green-500">SUCCESS</span>
                ) : (
                    <span className="text-red-500">ERROR</span>
                );
            },
        },
        {
            title: 'Thanh toán',
            dataIndex: 'payMethod',
            key: 'payMethod',
            width: '15%',
            render: (record: number) =>
                record === 1 ? (
                    <span className="text-green-500">Trả sau</span>
                ) : (
                    <span className="text-red-500">Đã thanh toán</span>
                ),
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            width: '20%',
            render: (_: any, record: Order) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                            Lưu
                        </Typography.Link>
                        <Popconfirm
                            title="Bạn có muốn hủy bỏ thay đổi"
                            onConfirm={cancel}
                            okButtonProps={{ type: 'default' }}
                        >
                            <a>Hủy</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <div className="flex">
                        <ButtonComponent
                            icon={<EditOutlined />}
                            disabled={editingKey !== '' || record.status === StatusEnum.ORDER_CANCELLED}
                            onClick={() => edit(record)}
                        />

                        <ButtonComponent
                            disabled={editingKey !== '' || record.status === StatusEnum.ORDER_CANCELLED}
                            onClick={() => showDeleteConfirm(record)}
                            className="ml-2 !bg-red-500"
                            icon={<DeleteOutlined />}
                        />

                        {record.status !== StatusEnum.ORDER_CANCELLED && (
                            <ButtonComponent
                                onClick={() => router.push(`orders/${record.id}`)}
                                className="ml-2  !bg-gray-800"
                                icon={<PrinterOutlined />}
                            />
                        )}
                    </div>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Order) => ({
                record,
                inputType: col.dataIndex === true ? 'Thành công' : 'Thất bại',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                rowSelection={rowSelection}
                expandable={{
                    expandIcon: ({ onExpand, record }) => (
                        <DoubleRightOutlined
                            onClick={(e) => onExpand(record, e)}
                            className="rotate-90 cursor-pointer"
                        />
                    ),
                    expandedRowRender: (record) => {
                        return (
                            <div>
                                <div className="space-y-1 mb-6">
                                    <h1>
                                        <span className="inline-block w-[180px]">ID:</span> {record.id}
                                    </h1>
                                    <p>
                                        <span className="inline-block w-[180px]">Tên khách hàng:</span>
                                        <span className="font-semibold tracking-wider">{record.fullName}</span>
                                    </p>
                                    <p>
                                        <span className="inline-block w-[180px]">Email:</span>
                                        <span className="font-semibold tracking-wider">{record.user?.email}</span>
                                    </p>
                                    <p>
                                        <span className="inline-block w-[180px]">Số điện thoại:</span>
                                        <span className="font-semibold tracking-wider">{record.phone}</span>
                                    </p>
                                    <p>
                                        <span className="inline-block w-[180px]">Địa chỉ:</span>
                                        <span className="font-semibold tracking-wider">{record.address}</span>
                                    </p>
                                    <p>
                                        <span className="inline-block w-[180px]">Địa chỉ chi tiết:</span>
                                        <span className="font-semibold tracking-wider">{record.detailAddress}</span>
                                    </p>
                                    <p>
                                        <span className="inline-block w-[180px]">Tổng: </span>
                                        <span className="font-semibold tracking-wider">{formartUSD(record.total)}</span>
                                    </p>
                                    <p>
                                        <span className="inline-block w-[180px]">Phương thức thanh toán:</span>
                                        <span className="font-semibold tracking-wider">
                                            {record.payMethod === 1 ? 'Trả sau' : 'Đã thanh toán'}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="inline-block w-[180px]">Giao hàng:</span>
                                        <span className="font-semibold tracking-wider">
                                            {record.deliveryMethod === 1 ? 'Tiêu chuẩn' : 'Nhanh'}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="inline-block w-[180px]">Status:</span>
                                        <span className="font-semibold tracking-wider">
                                            {renderStatus(record.status)}
                                        </span>
                                    </p>
                                </div>
                                <table className="border-spacing-2 !rounded-none">
                                    <thead className="!rounded-none">
                                        <tr>
                                            <th className="text-left border p-2 !rounded-none">Tên sản phẩm</th>
                                            <th className="text-left border p-2 !rounded-none">Số lượng</th>
                                            <th className="text-left border p-2 !rounded-none">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.orderItems.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="border flex items-center gap-x-2 p-2">
                                                        <img
                                                            src={`/uploads/${item.product.images[0]}`}
                                                            width={50}
                                                            height={50}
                                                            alt=""
                                                        />
                                                        {item.name}
                                                    </td>
                                                    <td className="border p-2">{item.quantity}</td>
                                                    <td className="border p-2">
                                                        {formartUSD(item.product.price * item.quantity)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        );
                    },
                }}
                rowKey={'id'}
                columns={mergedColumns}
                dataSource={orders}
                scroll={{ x: 1000 }}
            />
        </Form>
    );
};

export default OrderData;
