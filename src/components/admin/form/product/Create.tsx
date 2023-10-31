import instance from '@/lib/axios';
import { Category } from '@prisma/client';
import { Button, Card, Form, Input, InputNumber, InputRef, List, Modal, Select, Space, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import UploadFilePublic from '../../uploads/UploadFileServer';
import { CloseCircleOutlined } from '@ant-design/icons';

type Props = {
    categories: Category[] | null;
};

type ExtraOptionInput = {
    extraName: string;
    extraPrice?: number;
};

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 12 },
};

const CreateProduct = ({ categories }: Props) => {
    const router = useRouter();

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [extraOption, setExtraOption] = useState<ExtraOptionInput[]>([]);
    const [extraName, setExtraName] = useState<string>('');
    const [extraPrice, setExtraPrice] = useState<number | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [sizeInput, setSizeInput] = useState<string>('');
    const [sizes, setSizes] = useState<string[]>([]);

    const extraRef = useRef<InputRef | null>(null);
    const sizeRef = useRef<InputRef | null>(null);

    // Extra option start
    const handleAddExtraOption = () => {
        setExtraOption((prev) => [...prev, { extraName, extraPrice: extraPrice! }]);
        setExtraName('');
        setExtraPrice(null);
        extraRef.current?.focus();
    };

    const handleRemoveExtraOption = (index: number) => {
        setExtraOption((prev) => [...prev.filter((_item, i) => i !== index)]);
    };

    // Extra option end

    const handleAddSize = () => {
        setSizes((prev) => [...prev, sizeInput]);
        setSizeInput('');
        sizeRef.current?.focus();
    };

    const handleRemoveSize = (i: number) => {
        setSizes((prev) => [...prev.filter((_item, index) => index !== i)]);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = async (values: any) => {
        try {
            const { data, status } = await instance.post('/api/pr/product', { ...values, extraOption, images, sizes });

            if (status === 200) {
                toast.success(`Tạo sản phẩm ${values.name} thành công`);
                router.refresh();
                form.resetFields();
                setOpen(false);
            }

            return data;
        } catch (error) {
            toast.error(`Tạo sản phẩm ${values.name} không thành công`);
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <Button className="mb-6 float-right" type="default" onClick={showModal}>
                Thêm sản phẩm
            </Button>
            <Modal
                open={open}
                title="Thêm sản phẩm"
                width={1000}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                ]}
            >
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="shortDes"
                        label="Mô tả ngắn"
                        rules={[{ required: true, message: 'Mô tả ngắn là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả chi tiết"
                        rules={[{ required: true, message: 'Mô tả chi tiết là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        label="Loại hàng"
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
                        <UploadFilePublic images={images} setImages={setImages} />
                    </Form.Item>

                    {/* Upload Images to public end*/}

                    {/* Extra option start*/}

                    {extraOption.length === 0 ? undefined : (
                        <Form.Item label="Lựa chọn hiện có">
                            <List
                                grid={{ gutter: 16, column: 4 }}
                                dataSource={extraOption}
                                renderItem={(item, i) => (
                                    <List.Item>
                                        <Button onClick={() => handleRemoveExtraOption(i)} type="default" danger>
                                            Xóa
                                        </Button>
                                        <Card
                                            title={`Tên: ${item.extraName}`}
                                        >{`Chi phí thêm : ${item.extraPrice}`}</Card>
                                    </List.Item>
                                )}
                            />
                        </Form.Item>
                    )}

                    <Form.Item label="Lựa chọn của khách">
                        <Space.Compact size="large">
                            <Input
                                ref={extraRef}
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

                    {/* Sizes start */}
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

                    <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Giá là bắt buộc' }]}>
                        <InputNumber type="number" />
                    </Form.Item>

                    <Form.Item name="saleOff" label="Giảm giá (nếu có)">
                        <InputNumber type="number" />
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        label="Số lượng (hiện có)"
                        rules={[{ required: true, message: 'Số lượng là bắt buộc' }]}
                    >
                        <InputNumber type="number" />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="default" htmlType="submit">
                            Submit
                        </Button>
                        <Button className="ml-2" htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateProduct;
