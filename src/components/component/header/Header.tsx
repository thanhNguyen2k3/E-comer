'use client';

import Image from 'next/image';
import Link from 'next/link';
import DrawerMobileMenu from '../mobile/DrawerMobileMenu';
import DrawerCart from '../modal/cart/DrawerCart';

const Header = () => {
    return (
        <div className="w-layout max-w-full mx-auto">
            {/* Tablet and Window Interface start */}
            <div className="hidden lg:flex items-center h-[60px] lg:h-[90px] shadow-sm">
                <Image src={'/logo.webp'} alt="logo" width={180} height={36} />

                <ul className="flex gap-x-2">
                    <li>
                        <Link className="hover:text-primary hover:drop-shadow" href={''}>
                            NEWS & EVENTS
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-primary hover:drop-shadow" href={''}>
                            CHARACTERS
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-primary hover:drop-shadow" href={''}>
                            THE WORLD
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-primary hover:drop-shadow" href={''}>
                            ART
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:text-primary" href={''}>
                            ABOUT
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Interface start */}

            <div className="flex justify-between lg:hidden items-center h-[60px] lg:h-[90px] shadow-sm">
                {/* Mobile Menu Drawer start */}
                <DrawerMobileMenu />
                {/* Mobile Menu Drawer end */}

                <Image src={'/logo.webp'} alt="logo" width={180} height={36} />

                <DrawerCart />
            </div>
            {/* Mobile Interface end */}
        </div>
    );
};

export default Header;
