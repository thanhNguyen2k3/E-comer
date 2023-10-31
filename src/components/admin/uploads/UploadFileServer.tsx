'use client';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    setImages: Dispatch<SetStateAction<string[]>>;
    images?: string[];
};

const UploadFilePublic = ({ setImages }: Props) => {
    const props: UploadProps = {
        action: 'http://localhost:3000/api/pr/uploads',
        listType: 'picture',
        multiple: true,
        method: 'POST',
        beforeUpload(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                setImages((prev) => [...prev, file.name]);
                reader.onload = () => {
                    const img = document.createElement('img');
                    img.src = reader.result as string;
                };
            });
        },
    };

    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
            </Upload>
        </>
    );
};

export default UploadFilePublic;
