import { Spin } from 'antd';

const LoadingSpinner = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center bg-gray-500/25 items-center">
            <Spin size="large" />
        </div>
    );
};

export default LoadingSpinner;
