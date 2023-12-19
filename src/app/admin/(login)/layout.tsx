'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    const router = useRouter();
    const { status, data } = useSession();

    useEffect(() => {
        if (!data?.user.isAdmin || !data?.user) {
            return;
        } else {
            router.push('dashboard');
        }
    }, [data, router]);

    return (
        <div className="relative w-screen h-screen">
            <div
                style={{ background: 'url(/bg-admin.jpg)' }}
                className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
            >
                {children}
            </div>
        </div>
    );
};

export default Layout;
