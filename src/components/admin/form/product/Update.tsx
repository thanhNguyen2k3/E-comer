'use client';
import instance from '@/lib/axios';
import { Category, ExtraOption, Product } from '@prisma/client';
import { Button, Card, Form, Input, InputNumber, InputRef, List, Select, Space, Tag } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import UploadFilePublic from '../../uploads/UploadFileServer';
import { Image } from 'antd';
import { CloseCircleOutlined, CloseSquareOutlined } from '@ant-design/icons';

type ExtendProduct = Product & {
    category?: Category;
    extraOption?: ExtraOption[];
};

type Props = {
    categories: Category[];
    product: ExtendProduct;
};

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 12 },
};

const CreateProduct = ({ categories, product }: Props) => {
    const router = useRouter();

    type PickUp = Pick<ExtraOption, 'extraName' | 'extraPrice'>;

    const [form] = Form.useForm();
    const [extraOption, setExtraOption] = useState<PickUp[]>(product.extraOption!);
    const [sizes, setSizes] = useState<string[]>(product.sizes);
    const [sizeInput, setSizeInput] = useState<string>('');

    const rest = extraOption.map((extra) => {
        const { extraName, extraPrice } = extra;

        return { extraName, extraPrice };
    });

    const [extraName, setExtraName] = useState<string>('');
    const [extraPrice, setExtraPrice] = useState<number | null>(null);
    const [images, setImages] = useState<string[]>(product.images);

    const inputRef = useRef<InputRef | null>(null);
    const sizeRef = useRef<InputRef | null>(null);

    const handleAddExtraOption = () => {
        setExtraOption((prev) => [...prev, { extraName, extraPrice: extraPrice }]);
        setExtraName('');
        setExtraPrice(null);
        inputRef.current?.focus();
    };

    const handleRemoveExtraOption = (i: number) => {
        setExtraOption((prev) => [...prev.filter((_item, index) => index !== i)]);
    };

    const handleAddSize = () => {
        setSizes((prev) => [...prev, sizeInput]);
        setSizeInput('');
        sizeRef.current?.focus();
    };

    const handleRemoveSize = (i: number) => {
        setSizes((prev) => [...prev.filter((_item, index) => index !== i)]);
    };

    const onFinish = async (values: any) => {
        try {
            const { data, status } = await instance.patch(`/api/pr/product/${product.id}`, {
                ...values,
                extraOption: rest,
                images,
                sizes,
            });

            if (status === 200) {
                toast.success(`Cập nhật ${values.name} thành công`);
                router.refresh();
                form.resetFields();
                router.back();
            }

            return data;
        } catch (error) {
            toast.error(`Cập nhật ${values.name} không thành công`);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Tên sản phẩm"
                    initialValue={product.name}
                    rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="shortDes"
                    label="Mô tả ngắn"
                    initialValue={product.shortDes}
                    rules={[{ required: true, message: 'Mô tả ngắn là bắt buộc' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả chi tiết"
                    initialValue={product.description}
                    rules={[{ required: true, message: 'Mô tả chi tiết là bắt buộc' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="categoryId"
                    label="Loại hàng"
                    initialValue={product.categoryId}
                    rules={[{ required: true, message: 'Loại hàng là bắt buộc' }]}
                >
                    <Select placeholder="Loại hàng" allowClear>
                        <Option value="">-- Chọn loại hàng --</Option>
                        {categories?.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Upload Images to public start*/}
                <Form.Item label="Tải ảnh lên">
                    <UploadFilePublic images={product.images} setImages={setImages} />
                    {product.images?.length! > 0 && (
                        <Space className="mt-2">
                            {images?.map((img, i) => (
                                <div key={i} className="relative">
                                    <Image
                                        width={120}
                                        height={120}
                                        src={`/uploads/${img}`}
                                        fallback={`/uploads/${img}`}
                                    />

                                    <Button
                                        onClick={() =>
                                            setImages((prev) => [...prev.filter((_item, index) => index !== i)])
                                        }
                                        className="absolute top-0 right-0"
                                        size="small"
                                        danger
                                        type="primary"
                                        icon={<CloseSquareOutlined />}
                                    />
                                </div>
                            ))}
                        </Space>
                    )}
                </Form.Item>

                {/* Upload Images to public end*/}

                {/* Extra option start*/}

                {rest?.length === 0 ? undefined : (
                    <Form.Item label="Lựa chọn hiện có">
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={rest}
                            renderItem={(item, i) => (
                                <List.Item>
                                    <Button onClick={() => handleRemoveExtraOption(i)} type="default" danger>
                                        Xóa
                                    </Button>
                                    <Card title={`Tên: ${item.extraName}`}>{`Chi phí thêm : ${item.extraPrice}`}</Card>
                                </List.Item>
                            )}
                        />
                    </Form.Item>
                )}

                <Form.Item label="Lựa chọn của khách">
                    <Space.Compact size="large">
                        <Input
                            ref={inputRef}
                            value={extraName}
                            onChange={(e) => setExtraName(e.target.value)}
                            placeholder="Tên mở rộng"
                        />
                        <Input
                            value={Number(extraPrice)}
                            onChange={(e) => setExtraPrice(Number(e.target.value))}
                            placeholder="Giá mở rộng"
                            type="number"
                        />
                        <Button type="default" htmlType="button" onClick={handleAddExtraOption}>
                            Thêm
                        </Button>
                    </Space.Compact>
                </Form.Item>

                {/* Extra option end*/}

                {/* Size start */}

                {sizes.length > 0 && (
                    <Form.Item label="Size hiện có">
                        {sizes.map((size, i) => (
                            <Tag
                                closeIcon={
                                    <CloseCircleOutlined
                                        onClick={() => handleRemoveSize(i)}
                                        className=" text-red-500 text-sm"
                                    />
                                }
                                color="default"
                                key={i}
                            >
                                <span className=" font-semibold mr-1">Size: </span>
                                <strong className="text-base text-blue-500">{size}</strong>
                            </Tag>
                        ))}
                    </Form.Item>
                )}
                <Form.Item label="Sizes (nếu có)">
                    <Space.Compact size="large">
                        <Input
                            ref={sizeRef}
                            value={sizeInput}
                            onChange={(e) => setSizeInput(e.target.value)}
                            placeholder="Size"
                        />
                        <Button type="default" htmlType="button" onClick={handleAddSize}>
                            Thêm
                        </Button>
                    </Space.Compact>
                </Form.Item>
                {/* Sizes end */}

                <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true, message: 'Giá là bắt buộc' }]}
                    initialValue={product.price}
                >
                    <InputNumber type="number" />
                </Form.Item>

                <Form.Item name="saleOff" label="Giảm giá (nếu có)" initialValue={product.saleOff}>
                    <InputNumber type="number" />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Số lượng (hiện có)"
                    rules={[{ required: true, message: 'Số lượng là bắt buộc' }]}
                    initialValue={product.quantity}
                >
                    <InputNumber type="number" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button ghost type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button className="ml-2" htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                    <Link href={'.'} className="ml-2">
                        <Button danger htmlType="button">
                            Hủy
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateProduct;
