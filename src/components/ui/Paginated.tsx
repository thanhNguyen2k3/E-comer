'use client';

import { PER_PAGE } from '@/constant';
import { Pagination, PaginationProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

type Props = {
    count?: number;
    routing?: string;
};

const StylePagination = styled(Pagination)`
    .ant-pagination-item {
        border-radius: 0;
        font-weight: 600;

        .ant-pagination-item-active {
            background-color: #6eb89f;
        }
    }

    .ant-pagination-item-active {
        background-color: #6eb89f !important;
        color: #fff !important;
        border-color: #6eb89f !important;

        a {
            color: #fff;
        }
    }
`;

const Paginated = ({ count, routing }: Props) => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        router.push(`${routing}page=${pageNumber}`, { scroll: false });
    };

    return (
        <div className="lg:mt-36 mt-16 flex justify-center">
            <div>
                <StylePagination
                    onChange={onChange}
                    total={count}
                    pageSize={PER_PAGE}
                    defaultCurrent={page}
                    current={page}
                />
            </div>
        </div>
    );
};

export default Paginated;
