'use client';

import instance from '@/lib/axios';
import { Category, Character, Region, Vision, Weapon } from '@prisma/client';
import { Button, Card, Checkbox, Form, Input, InputRef, List, Select, Space } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import UploadFilePublic from '../../uploads/UploadFileServer';
import ButtonComponent from '@/components/local/Button';
import InputField from '@/components/local/InputField';
import styled from 'styled-components';
import Editors from './Editors';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ExtandCharacter } from '@/types/extend';

type Props = {
    categories: Category[] | null;
    characters?: Character[];
    regions: Region[];
    weapons: Weapon[];
    visions: Vision[];
};

type ExtraOptionInput = {
    extraName: string;
    extraPrice?: number;
};

const { Option } = Select;

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

const CreateProduct = ({ categories, characters, regions, visions, weapons }: Props) => {
    const router = useRouter();

    const [form] = Form.useForm();
    const [extraOption, setExtraOption] = useState<ExtraOptionInput[]>([]);
    const [extraName, setExtraName] = useState<string>('');
    const [extraPrice, setExtraPrice] = useState<number | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [editors, setEditors] = useState<string>('');
    const [characterIds, setCharacterIds] = useState<CheckboxValueType[]>([]);
    const [charactersFilter, setCharactersFilter] = useState<ExtandCharacter[] | undefined>([]);

    //Ids
    const [regionId, setRegionId] = useState<string>('');
    const [weaponId, setWeaponId] = useState<string>('');
    const [visionId, setVisionId] = useState<string>('');

    const extraRef = useRef<InputRef | null>(null);

    // Effected
    useEffect(() => {
        const makeRequest = () => {
            instance
                .get(`/api/pr/character?regionId=${regionId}&weaponId=${weaponId}&visionId=${visionId}`)
                .then((res) => {
                    setCharactersFilter(res.data);
                });
        };

        makeRequest();
    }, [visionId, regionId, weaponId]);

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

    const onFinish = async (values: any) => {
        try {
            const { data, status } = await instance.post('/api/pr/product', {
                ...values,
                description: editors,
                options: extraOption,
                images,
                characterIds,
            });

            if (status === 200) {
                toast.success(`Tạo sản phẩm ${values.name} thành công`);
                router.refresh();
                form.resetFields();
            }

            return data;
        } catch (error) {
            toast.error(`Tạo sản phẩm ${values.name} không thành công`);
        }
    };

    const onReset = () => {
        form.resetFields();
        setImages([]);
        setEditors('');
    };

    return (
        <>
            <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish} encType="multipart/form-data">
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

                <Form.Item label="Nhân vật">
                    <div className="grid  grid-cols-3 gap-x-2">
                        <StyleSelect
                            placeholder="Vùng"
                            defaultValue={''}
                            allowClear
                            onChange={(value: string) => setRegionId(value)}
                        >
                            <Option value="">-- Chọn vùng --</Option>
                            {regions?.map((reion) => (
                                <Option key={reion.id} value={reion.id}>
                                    {reion.name}
                                </Option>
                            ))}
                        </StyleSelect>

                        <StyleSelect
                            placeholder="Vũ khí"
                            defaultValue={''}
                            allowClear
                            onChange={(value: string) => setWeaponId(value)}
                        >
                            <Option value="">-- Chọn vũ khí --</Option>
                            {weapons?.map((weapon) => (
                                <Option key={weapon.id} value={weapon.id}>
                                    {weapon.name}
                                </Option>
                            ))}
                        </StyleSelect>

                        <StyleSelect
                            placeholder="Vision"
                            defaultValue={''}
                            allowClear
                            onChange={(value: string) => setVisionId(value)}
                        >
                            <Option value="">-- Chọn vision --</Option>
                            {visions?.map((vision) => (
                                <Option key={vision.id} value={vision.id}>
                                    {vision.name}
                                </Option>
                            ))}
                        </StyleSelect>
                    </div>
                    <Checkbox.Group
                        onChange={(values) => setCharacterIds(values)}
                        className="grid grid-cols-3 lg:grid-cols-6 gap-2 mt-2 max-h-[360px] overflow-x-auto overflow-y-auto"
                    >
                        {charactersFilter?.length === 0 ? (
                            <h1>Không tìm thấy</h1>
                        ) : (
                            charactersFilter?.map((character) => (
                                <div key={character.id} className="border p-2">
                                    <Checkbox value={character.id}>
                                        <img src={`/uploads/${character.thumbnail}`} className="w-full" alt="" />

                                        <p className="uppercase font-semibold mt-1 text-center">{character.name}</p>
                                    </Checkbox>
                                </div>
                            ))
                        )}
                    </Checkbox.Group>
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
                                    <Card title={`Tên: ${item.extraName}`}>{`Chi phí thêm : ${
                                        item.extraPrice || 0
                                    }`}</Card>
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
                            Submit
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
