'use client';

import { formartUSD } from '@/utils/formartUSD';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type OverviewProps = {
    data: any[];
};

const Overview = ({ data }: OverviewProps) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey={'name'} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />

                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${formartUSD(value)}`}
                />

                <Bar dataKey={'total'} fill="#3498dd" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Overview;
