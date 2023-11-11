import { Alert } from 'antd';

const AlertError = () => {
    return (
        <Alert
            message="Sản phẩm này hiện không tồn tại"
            description="Vui lòng quay lại trang chủ để tìm kiếm sản phẩm khác mà bạn muốn."
            type="error"
            showIcon
        />
    );
};

export default AlertError;
