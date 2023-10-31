'use client';

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Category, ExtraOption, Product } from '@prisma/client';
import { Button, Input, InputRef, Modal, Space, Table } from 'antd';
import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import ExtraEditable from '../../server/ExtraEditable';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateProduct from '@/components/admin/form/product/Create';
import instance from '@/lib/axios';

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

const ProductData = ({ products, extraOptions, categories }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    //state start
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Selected id
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    // state end

    // Ref start
    const searchInput = useRef<InputRef>(null);
    //Ref end

    const hasSelected = selectedRowKeys.length > 0;

    const onSelectChange = (newSelectedRowKeys: Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const showDeleteConfirm = (record: ExtendProduct) => {
        const rest = record.extraOption.map((extra) => {
            const { extraName, extraPrice } = extra;

            return { extraName, extraPrice };
        });

        const { slug, id, createdAt, updatedAt, category, ...spread } = record;

        confirm({
            title: (
                <p>
                    Bạn có muốn xóa <strong className="text-red-500">{record.name}</strong>
                </p>
            ),
            icon: <ExclamationCircleFilled />,
            content: (
                <p>
                    <strong className="text-red-500">{record.name}</strong> sẽ được chuyển vào thùng rác.😉
                </p>
            ),
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                const { status } = await instance.patch(`/api/pr/product/${record.id}/soft-delete`, {
                    ...spread,
                    deleted: true,
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

    const showModal = () => {
        setIsModalOpen(true);
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
            title: 'Mở rộng',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return (
                    <Link href={`products?productId=${id}`} shallow={false} type="default" onClick={showModal}>
                        Xem
                    </Link>
                );
            },
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (record) => (
                <div>
                    <Button
                        type="default"
                        icon={
                            <Link href={`products/${record.slug}`}>
                                <EditOutlined />
                            </Link>
                        }
                    />
                    <Button
                        onClick={() => showDeleteConfirm(record)}
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

            <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
            {/* Data Grid */}
            <Table
                rowSelection={rowSelection}
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

export default ProductData;
