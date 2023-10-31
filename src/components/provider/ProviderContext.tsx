'use client';

import { store } from '@/store';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

type Props = { children: ReactNode };

const ProviderContext = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {children}
        </Provider>
    );
};

export default ProviderContext;
