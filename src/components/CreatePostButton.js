import{ useState } from 'react';
import { BASE_URL, TOKEN_KEY } from "../constants";
import React, { Component, createRef } from "react";
import { Modal, Button, message } from "antd";
import { PostForm } from "./PostForm";


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
        confirmLoading: true
      });
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
   
             const opt = {
               method: "POST",
               url: `${BASE_URL}/upload`,
               headers: {
                 Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
               },
               data: formData
             };
   
            
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