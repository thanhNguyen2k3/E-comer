'use client';

import { Input, InputProps, Form, FormItemProps, InputRef, InputNumber } from 'antd';
import { ChangeEvent, MutableRefObject, ReactNode } from 'react';
import styled from 'styled-components';

type Props = InputProps &
    FormItemProps & {
        onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
        children?: ReactNode;
        isNumber?: boolean;
        ref?: MutableRefObject<InputRef | null>;
    };

const StyleInput = styled(Input)`
    border: solid 2px #ddd;
    border-radius: 2px;
    padding: 10px;
    color: #545454;
    font-size: 16px;
    font-weight: 400;
    width: 100%;

    &:focus {
        border-color: #ccc;
    }

    &:hover {
        border-color: #ccc;
    }
`;

const StyleInputNumber = styled(InputNumber)`
    border: solid 2px #ddd;
    border-radius: 2px;
    padding: 6px 0;
    color: #545454;
    font-size: 16px;
    font-weight: 400;
    width: 100%;

    &:focus-within {
        border-color: #ccc;
    }

    &:hover {
        border-color: #ccc;
    }
`;

const StyleFormItem = styled(Form.Item)`
    margin-bottom: 12px;
`;

const InputField = ({ onChange, isNumber, children, ...props }: Props) => {
    return (
        <StyleFormItem {...props}>
            {isNumber ? <StyleInputNumber /> : <StyleInput {...props} onChange={onChange} />}
        </StyleFormItem>
    );
};

export default InputField;
