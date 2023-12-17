'use client';

import { Category, Character } from '@prisma/client';
import { Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {
    categories: Category[];
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

const NavigationShop = ({ categories, characters }: Props) => {
    const [selected, setSelected] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const router = useRouter();

    const onChange = (value: string) => {
        setSelected(value);

        if (value === '') {
            router.push('/shop');
        }
        {
            router.push(`/shop/${value}`, { scroll: false });
        }
    };

    const onChange2 = (value: string) => {
        setLink(value);

        if (selected.length === 0) {
            router.push(`/shop/character/${value}`, {
                scroll: false,
            });
        } else {
            router.push(`/shop/${selected}/${value}`, {
                scroll: false,
            });
        }
    };

    return (
        <div className="mt-6">
            <StyledSelect onChange={onChange} value={selected}>
                <Option value="">-- Lựa chọn --</Option>
                {categories?.map((cate) => (
                    <Option key={cate.id} value={cate.slug}>
                        {cate.name}
                    </Option>
                ))}
            </StyledSelect>
        </div>
    );
};

export default NavigationShop;
