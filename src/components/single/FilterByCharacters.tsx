'use client';

import { Character } from '@prisma/client';
import { Select } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {
    characters: Character[];
};

const { Option } = Select;

const StyledSelect = styled(Select)`
    min-width: 160px;

    .ant-select-selector {
        border-radius: 0;
        text-align: center;
    }
`;

const FilterByCharacters = ({ characters }: Props) => {
    const path = usePathname();

    const [link, setLink] = useState<string>('');
    const router = useRouter();

    const onChange = (value: string) => {
        setLink(value);
    };

    const pathCheck = path?.split('/');

    return (
        <div>
            <div className="xl:block hidden">
                <h1 className="text-base font-semibold mt-8 mb-4 uppercase">Tìm kiếm theo nhân vật</h1>

                <div>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-1 overflow-y-auto max-h-[223px]">
                        {characters.map((character) => (
                            <Link
                                key={character.id}
                                className="text-sm capitalize"
                                href={
                                    pathCheck[2] === undefined
                                        ? `/shop/?filter_character=${character.id}`
                                        : `/shop/${pathCheck[2]}/?filter_character=${character.id}`
                                }
                                scroll={false}
                            >
                                {character.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterByCharacters;
