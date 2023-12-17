'use client';

import ButtonComponent from '@/components/local/Button';
import InputField from '@/components/local/InputField';
import { Form } from 'antd';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const Page = () => {
    const { data } = useSession();

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            email: data?.user.email,
        });
    }, [form]);

    return (
        <Form form={form} layout="vertical" className="grid grid-cols-4">
            <InputField
                className="col-span-4"
                name={'fullName'}
                label="Tên đầy đủ"
                rules={[{ required: true, message: 'Bắt buộc' }]}
            />
            <InputField
                className="col-span-4"
                name={'email'}
                label="Email"
                rules={[{ required: true, message: 'Bắt buộc' }]}
            />

            <ButtonComponent className="col-span-1 mt-2" htmlType="submit">
                Lưu thay đổi
            </ButtonComponent>
        </Form>
    );
};

export default Page;
