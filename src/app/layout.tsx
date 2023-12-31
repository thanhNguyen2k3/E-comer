// Css
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-quill/dist/quill.snow.css';
// module
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProviderContext from '@/components/provider/ProviderContext';

const inter = Inter({ subsets: ['latin'], display: 'swap', fallback: ['...loading'] });

export const metadata: Metadata = {
    title: 'Genshin Shop',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <ProviderContext>{children}</ProviderContext>
            </body>
        </html>
    );
}
