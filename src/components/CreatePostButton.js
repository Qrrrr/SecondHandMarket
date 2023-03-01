import{ useState } from 'react';
import { BASE_URL, TOKEN_KEY } from "../constants";
import React, { Component, createRef } from "react";
import { Modal, Button, message } from "antd";
import { PostForm } from "./PostForm";
import { createPost } from "../utils";


class CreatePostButton extends Component {

    state = {
      isModalOpen: false,
      confirmLoading: false,
    };

    showModal = () => {
      this.setState({
        isModalOpen: true,
      });
    };
  
    handleOk = () => {
      this.setState({
        confirmLoading: true,
      })
      this.postForm
        .validateFields()
        .then((form) => {
          const { Category, Quantity, ItemName, ItemPrice, description, ZipCode, uploadPost } = form;
          console.log(form);
          const { type, originFileObj } = uploadPost[0];
          const postType = type.match(/^(image)/g)[0];
            createPost(form)
              .then(() => {
                message.success("Successfully post an item for sell!");
              })
              .catch((err) => {
              message.error(err.message);
              })
              .finally(() => {
                this.setState({
                  confirmLoading: false,
                  isModalOpen: false
                });
            });  
   
            
          //  }
        })
      
     };

   
    handleCancel = () => {
      console.log("Clicked cancel button");
      this.setState({
        isModalOpen: false
      });
    };

    render() {
      const { isModalOpen, confirmLoading } = this.state;

    return (
      <>
        <Button shape="circle" onClick={this.showModal}>
          SELL
        </Button>
        <Modal 
            title="Sell New Item" 
            open={isModalOpen} 
            onOk={this.handleOk} 
            okText="Create"
            onCancel={this.handleCancel}
            confirmLoading={confirmLoading}>
            
          <PostForm ref={(refInstance) => (this.postForm = refInstance)}/>
        </Modal>
      </>
    )
  }
}

export default CreatePostButton;