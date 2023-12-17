'use client';

import instance from '@/lib/axios';
import { Category } from '@prisma/client';
import { Form, Select } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UploadFilePublic from '../../uploads/UploadFileServer';
import ButtonComponent from '@/components/local/Button';
import InputField from '@/components/local/InputField';
import styled from 'styled-components';
import Editors from './Editors';
import { ExtandProduct } from '@/types/extend';

type Props = {
    categories: Category[] | null;
    product: ExtandProduct | null;
};

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 12 },
};

const StyleSelect = styled(Select)`
    .ant-select-selector {
        border-radius: 0;

        &:focus {
            border-color: #bbb !important;
        }
    }
`;

const CreateProduct = ({ categories, product }: Props) => {
    const router = useRouter();

    const [form] = Form.useForm();
    const [images, setImages] = useState<string[]>(product?.images!);
    const [editors, setEditors] = useState<string>(product?.description!);

    // Extra option start

    // Extra option end

    const onFinish = async (values: any) => {
        try {
            const { data, status } = await instance.patch(`/api/pr/product/${product?.id}`, {
                ...values,
                description: editors,
                images,
            });

            if (status === 200) {
                toast.success(`Cập nhật ${values.name} thành công`);
                router.refresh();
                router.back();
            }

            return data;
        } catch (error) {
            toast.error(`Cập nhật ${values.name} không thành công`);
        }
    };

    const onReset = () => {
        form.resetFields();
        setImages([]);
        setEditors('');
    };

    useEffect(() => {
        form.setFieldsValue({
            name: product?.name,
            shortDes: product?.shortDes,
            price: product?.price,
            saleOff: product?.saleOff,
            inStock: product?.inStock,
            categoryId: product?.categoryId,
        });
    }, [form]);

    return (
        <>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <InputField
                    name="name"
                    label="Tên sản phẩm"
                    rules={[{ required: true, message: 'Tên sản phẩm là bắt buộc' }]}
                />

                <InputField
                    name="shortDes"
                    label="Mô tả ngắn"
                    rules={[{ required: true, message: 'Mô tả ngắn là bắt buộc' }]}
                />

                <Form.Item label="Mô tả chi tiết">
                    <Editors value={editors} setValue={setEditors} />
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Loại hàng"
                    rules={[{ required: true, message: 'Loại hàng là bắt buộc' }]}
                >
                    <StyleSelect placeholder="Loại hàng" allowClear>
                        <Option value="">-- Chọn loại hàng --</Option>
                        {categories?.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </StyleSelect>
                </Form.Item>

                {/* Upload Images to public start*/}
                <Form.Item label="Tải ảnh lên">
                    <UploadFilePublic images={images} setImages={setImages} />
                </Form.Item>

                {/* Upload Images to public end*/}

                {/* Extra option start*/}

                {/* Extra option end*/}

                {/* Sizes start */}

                {/* Sizes end */}

                <InputField
                    isNumber
                    name="price"
                    label="Giá"
                    rules={[{ required: true, message: 'Giá là bắt buộc' }]}
                />

                <InputField isNumber name="saleOff" label="Giảm giá (nếu có)" />

                <InputField
                    isNumber
                    name="inStock"
                    label="Trong kho (hiện có)"
                    rules={[{ required: true, message: 'Số lượng là bắt buộc' }]}
                />

                <Form.Item {...tailLayout}>
                    <div className="flex">
                        <ButtonComponent disabled={images.length === 0} htmlType="submit">
                            Lưu
                        </ButtonComponent>
                        <ButtonComponent className="ml-2" htmlType="button" onClick={onReset}>
                            Reset
                        </ButtonComponent>
                        <ButtonComponent className="ml-2" htmlType="button" onClick={() => router.back()}>
                            Quay lại
                        </ButtonComponent>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateProduct;
