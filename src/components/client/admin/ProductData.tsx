'use client';

import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Category, Option, Product } from '@prisma/client';
import { Button, Input, InputRef, Modal, Space, Table, message } from 'antd';

import { ColumnType, ColumnsType, FilterConfirmProps } from 'antd/es/table/interface';
import { Key, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import ExtraEditable from '../../server/ExtraEditable';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateProduct from '@/components/admin/form/product/Create';
import instance from '@/lib/axios';
import styled from 'styled-components';
import ButtonComponent from '@/components/local/Button';
import { formartUSD } from '@/utils/formartUSD';
import { ExtandProduct } from '@/types/extend';

const { confirm } = Modal;

type Props = {
    products: Product[];
    options?: Option[];
    categories?: Category[];
};

type DataIndex = keyof ExtandProduct;

const StyleTable = styled(Table)``;

const ProductData = ({ products, options, categories }: Props) => {
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

    const showDeleteConfirm = (record: ExtandProduct) => {
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
                try {
                    const { status } = await instance.patch(`/api/pr/product/${record.id}/soft-delete`, {
                        deleted: true,
                    });
                    if (status === 200) {
                        message.success('Đã xóa thành công');
                        router.refresh();
                    }
                } catch (error: any) {
                    console.log(error.message);
                    message.error(error.message);
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

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ExtandProduct> => ({
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

    const columns: ColumnsType<ExtandProduct> = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            render: (price) => formartUSD(price),
        },
        {
            title: 'Trong kho',
            dataIndex: 'inStock',
            key: 'inStock',
            render: (record) => {
                return record <= 0 ? <span className="text-red-500">Hết hàng</span> : <span>{record}</span>;
            },
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
                <div className="flex items-center gap-x-2">
                    <Link href={`products/${record.slug}`}>
                        <ButtonComponent icon={<EditOutlined />} />
                    </Link>
                    <ButtonComponent
                        onClick={() => showDeleteConfirm(record)}
                        type="default"
                        className="!bg-red-400"
                        icon={<DeleteOutlined />}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            {/* Thêm sản phẩm */}

            <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
            {/* Data Grid */}
            <StyleTable
                rowSelection={rowSelection}
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
                <ExtraEditable productId={productId!} options={options!} />
            </Modal>
        </div>
    );
};

export default ProductData;
