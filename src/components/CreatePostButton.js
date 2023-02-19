import{ useState } from 'react';
import React, { Component, createRef } from "react";
import { Modal, Button, message } from "antd";
import { PostForm } from "./PostForm";


const CreatePostButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
      <>
        <Button shape="circle" onClick={showModal}>
          SELL
        </Button>
        <Modal 
            title="Sell New Item" 
            open={isModalOpen} 
            onOk={handleOk} 
            okText="Create"
            onCancel={handleCancel}>
          <PostForm/>
        </Modal>
      </>
    )
}

export default CreatePostButton;