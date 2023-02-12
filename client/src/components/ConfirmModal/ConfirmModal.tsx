import { Modal } from "antd";
import React, { MouseEventHandler, ReactNode, useState } from "react";

type ConfirmModalProps = {
    children: ReactNode;
    message: string;
    description: string;
    onConfirm?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
    loading?: boolean;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    children,
    message,
    description,
    onConfirm,
    onOpen,
    onClose,
    loading,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsModalOpen(true);
        if (onOpen) onOpen();
    };

    const handleOk = () => {
        setIsModalOpen(false);
        if (onConfirm) onConfirm();
        if (onClose) onClose();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        if (onClose) onClose();
    };

    return (
        <>
            <Modal
                title={message}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Да"
                cancelText="Отменить"
                confirmLoading={loading}
            >
                {description}
            </Modal>
            <div onClick={handleClick}>{children}</div>
        </>
    );
};
