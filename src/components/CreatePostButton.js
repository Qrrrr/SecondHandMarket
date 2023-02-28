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
      this.postForm
        .validateFields()
        .then((form) => {
          const { Category, ContactInfo, ItemName, ItemPrice, description, ZipCode, uploadPost } = form;
          console.log(form);
          const { type, originFileObj } = uploadPost[0];
          const postType = type.match(/^(image)/g)[0];
          this.setState({
            isModalOpen: false
          });
           if (postType) {
             let formData = new FormData();
             formData.append("category", Category);
             formData.append("contact", ContactInfo);
             formData.append("name", ItemName);
             formData.append("price", ItemPrice);
             formData.append("details", description);
             formData.append("zip", ZipCode);
             formData.append("media_file", originFileObj);
             formData.append("media_file", originFileObj);  
             createPost(formData)
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
   
            
           }
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
            onCancel={this.handleCancel}>
          <PostForm ref={(refInstance) => (this.postForm = refInstance)}/>
        </Modal>
      </>
    )
  }
}

export default CreatePostButton;