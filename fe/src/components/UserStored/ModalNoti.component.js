import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { deletePost } from '../../services/post.service';

const ModalNoti = ({ postId, type, isOpen}) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const handleOk = () => {
        deletePost(postId);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title="Confirmation"
                open = {isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to delete this post?</p>
            </Modal>
        </>
    );
};
export default ModalNoti