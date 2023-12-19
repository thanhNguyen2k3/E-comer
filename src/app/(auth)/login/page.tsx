'use client';

import ButtonComponent from '@/components/local/Button';
import InputField from '@/components/local/InputField';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { GoogleOutlined } from '@ant-design/icons';
import { Form, message } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Page = () => {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    if (status === 'authenticated') {
        router.push('/');
    }

    const onSubmit = (values: any) => {
        try {
            setLoading(true);

            signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.ok) {
                        message.success('Đăng nhập thành công');
                    }

                    if (callback?.error) {
                        message.error('Đăng nhập thất bại');
                    }
                })
                .catch((error) => {
                    message.error(error.message);
                });
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {status === 'authenticated' || status === 'loading' ? (
                <LoadingSpinner />
            ) : (
                <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
                    <div className="container h-full p-10">
                        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                            <div className="w-full">
                                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                    <div className="g-0 lg:flex lg:flex-wrap">
                                        {/* <!-- Left column container--> */}
                                        <div className="px-4 md:px-0 lg:w-6/12">
                                            <div className="md:mx-6 md:p-12">
                                                {/* <!--Logo--> */}
                                                <div className="text-center mb-6">
                                                    <a href="/">
                                                        <img className="mx-auto w-48" src="/logo.webp" alt="logo" />
                                                    </a>
                                                </div>

                                                <Form layout="vertical" onFinish={onSubmit}>
                                                    {/* <!--Username input--> */}
                                                    <div className="relative mb-4" data-te-input-wrapper-init>
                                                        <InputField
                                                            name={'email'}
                                                            label="Email"
                                                            rules={[{ required: true, message: 'Bắt buộc' }]}
                                                        />
                                                    </div>

                                                    {/* <!--Password input--> */}
                                                    <div className="relative mb-4" data-te-input-wrapper-init>
                                                        <InputField
                                                            name={'password'}
                                                            label="Mật khẩu"
                                                            rules={[{ required: true, message: 'Bắt buộc' }]}
                                                        />
                                                    </div>

                                                    {/* <!--Submit button--> */}
                                                    <div className="mb-12 pb-1 pt-1 text-center">
                                                        <ButtonComponent loading={loading} htmlType="submit">
                                                            Log in
                                                        </ButtonComponent>

                                                        {/* <!--Forgot password link--> */}
                                                        <a href="#">Forgot password?</a>
                                                    </div>

                                                    {/* <!--Register button--> */}
                                                    <div className="flex items-center justify-between pb-6">
                                                        <p className="mb-0 mr-2">Don't have an account?</p>
                                                        <button
                                                            type="button"
                                                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                            data-te-ripple-init
                                                            data-te-ripple-color="light"
                                                        >
                                                            Register
                                                        </button>
                                                    </div>

                                                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                                        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                                            OR
                                                        </p>
                                                    </div>
                                                </Form>
                                                <button
                                                    className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                                    style={{ backgroundColor: '#3b5998' }}
                                                    role="button"
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light"
                                                >
                                                    {/* <!-- Facebook --> */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="mr-2 h-3.5 w-3.5"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                                    </svg>
                                                    Continue with Facebook
                                                </button>
                                                <button
                                                    onClick={() => signIn('google')}
                                                    className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]"
                                                    style={{
                                                        background: 'linear-gradient(to right, #e94235, #fabb05 )',
                                                    }}
                                                    role="button"
                                                    type="button"
                                                    data-te-ripple-init
                                                    data-te-ripple-color="light"
                                                >
                                                    {/* <!-- Twitter --> */}
                                                    <GoogleOutlined className="mr-2" />
                                                    {/* #fabb05 */}
                                                    Continue with Google
                                                </button>
                                            </div>

                                            {/* <!-- Social login buttons --> */}
                                        </div>

                                        {/* <!-- Right column container with background and description--> */}
                                        <div
                                            className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                            style={{
                                                background: 'linear-gradient(to right, #6eb89f, #438E44)',
                                            }}
                                        >
                                            <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                                <h4 className="mb-6 text-xl font-semibold">
                                                    We are more than just a company
                                                </h4>
                                                <p className="text-sm">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Page;
