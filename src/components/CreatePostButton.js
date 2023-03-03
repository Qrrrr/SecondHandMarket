import React, { Component, createRef } from "react";
import { Modal, Button, message } from "antd";
import { PostForm } from "./PostForm";
import { createPost } from "../utils";
import { EditOutlined } from "@ant-design/icons";

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
    });
    this.postForm.validateFields().then((form) => {
      const { category, quantity, title, price, description, zipcode, file } =
        form;
      console.log(form);
      const { type, originFileObj } = file[0];
      const postType = type.match(/^(image)/g)[0];
      if (postType) {
        const formData = new FormData();
        formData.append("category", form.category);
        formData.append("quantity", form.quantity);
        formData.append("title", form.title);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append("zipcode", form.zipcode);
        formData.append("file", originFileObj);
        // createPost(form)
        console.log(formData);
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
              isModalOpen: false,
            });
          });
      }
    });
  };

  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen, confirmLoading } = this.state;

    return (
      <>
        <Button
          shape="circle"
          onClick={this.showModal}
          size="large"
          className="post-btn"
        >
          <EditOutlined />
        </Button>
        <Modal
          title="Sell New Item"
          open={isModalOpen}
          onOk={this.handleOk}
          okText="Create"
          onCancel={this.handleCancel}
          confirmLoading={confirmLoading}
        >
          <PostForm ref={(refInstance) => (this.postForm = refInstance)} />
        </Modal>
      </>
    );
  }
}

export default CreatePostButton;
