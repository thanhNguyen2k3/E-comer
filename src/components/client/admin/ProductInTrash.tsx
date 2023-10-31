'use client';

import { DeleteOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Category, ExtraOption, Product } from '@prisma/client';
import { Button, Input, InputRef, Modal, Space, Table } from 'antd';
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import ExtraEditable from '../../server/ExtraEditable';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateProduct from '@/components/admin/form/product/Create';
import instance from '@/lib/axios';
import { FaTrashRestore } from 'react-icons/fa';
const { confirm } = Modal;

type ExtendProduct = Product & {
    category: Category;
    extraOption: ExtraOption[];
};

type Props = {
    products: Product[];
    extraOptions?: ExtraOption[];
    categories?: Category[];
};

type DataIndex = keyof ExtendProduct;

const ProductInTrash = ({ products, extraOptions, categories }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const searchInput = useRef<InputRef>(null);

    const showRestore = (record: ExtendProduct) => {
        const rest = record.extraOption.map((extra) => {
            const { extraName, extraPrice } = extra;

            return { extraName, extraPrice };
        });

        const { slug, id, createdAt, updatedAt, category, ...spread } = record;

        confirm({
            title: (
                <p>
                    Bạn có muốn khôi phục <strong className="text-red-500">{record.name}</strong>
                </p>
            ),
            icon: <ExclamationCircleFilled />,
            content: (
                <p>
                    <strong className="text-red-500">{record.name}</strong> sẽ được khôi phục.😉
                </p>
            ),
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                const { status } = await instance.patch(`/api/pr/product/${record.id}/restore`, {
                    ...spread,
                    deleted: false,
                    extraOption: rest,
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

    const showDestroy = (record: ExtendProduct) => {
        console.log(record.name);

        confirm({
            title: (
                <p>
                    Bạn có thật sự muốn xóa <strong className="text-red-500">{record.name}</strong>
                </p>
            ),
            icon: <ExclamationCircleFilled />,
            content: (
                <div>
                    <strong className="text-red-500">{record.name}</strong> sẽ được loại bỏ hoàn toàn khỏi Database.😓
                </div>
            ),
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {},
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        router.push('products');
        setIsModalOpen(false);
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

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ExtendProduct> => ({
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
                        type="primary"
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

    const columns: ColumnsType<ExtendProduct> = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
            fixed: 'left',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: '20%',
        },
        {
            title: 'Sale',
            dataIndex: 'saleOff',
            key: 'saleOff',
        },
        {
            title: 'Loại hàng',
            dataIndex: 'category',
            key: 'category',
            width: '',
            render: (cate) => {
                return cate === null ? 'Chưa cập nhật' : cate.name;
            },
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (record) => (
                <div>
                    <Button onClick={() => showRestore(record)} type="default" icon={<FaTrashRestore />} />

                    <Button
                        onClick={() => showDestroy(record)}
                        type="default"
                        className="ml-2"
                        danger
                        icon={<DeleteOutlined />}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            {/* Thêm sản phẩm */}
            <CreateProduct categories={categories!} />

            {/* Data Grid */}
            <Table
                rowSelection={{}}
                expandable={{
                    expandedRowRender: (record) => <p>{record.shortDes}</p>,
                }}
                rowKey={'id'}
                columns={columns as any}
                dataSource={products}
                scroll={{ x: 1000 }}
            />

            {/* Modal update ExtraOption */}
            <Modal
                title="Chi phí phát sinh"
                okType="default"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <ExtraEditable productId={productId!} extraOptions={extraOptions!} />
            </Modal>
        </div>
    );
};

export default ProductInTrash;
