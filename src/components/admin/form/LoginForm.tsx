'use client';

import ButtonComponent from '@/components/local/Button';
import InputField from '@/components/local/InputField';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import instance from '@/lib/axios';
import { Form, message } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {};

const LoginForm = ({}: Props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (values: any) => {
        try {
            setLoading(true);

            signIn('credentials', {
                ...values,
                redirect: false,
            }).then((callback) => {
                if (callback?.ok) {
                    message.success('Đăng nhập thành công');
                    router.push('dashboard');
                }

                if (callback?.error) {
                    message.error('Đăng nhập thất bại');
                }
            });
        } catch (error: any) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // if (status === 'loading') return <LoadingSpinner />;

    return (
        <div className="absolute w-[400px] bg-white/40 p-4">
            <div className="mb-4">
                <img src="/logo.webp" alt="" />
            </div>
            <Form layout="vertical" onFinish={onSubmit}>
                <InputField
                    label={<span className="text-gray-200">Tài khoản Admin</span>}
                    name={'email'}
                    rules={[{ required: true, message: 'Bắt buộc' }]}
                />
                <InputField
                    isPassword
                    label={<span className="text-gray-200">Mật khẩu</span>}
                    name={'password'}
                    rules={[{ required: true, message: 'Bắt buộc' }]}
                />

                <div className="mt-6">
                    <ButtonComponent htmlType="submit" loading={loading}>
                        Đăng nhập
                    </ButtonComponent>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
