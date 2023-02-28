import React, { forwardRef } from "react";
import { Form, Upload, Input, Select, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export const PostForm = forwardRef((props, formRef) => {
    const formItemLayout = {
    labelCol: { span: 6 },
        wrapperCol: { span: 14 }
    };
    const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
         return e;
    }
    return e && e.fileList;
    };

    return (
        <Form name="validate_other" {...formItemLayout} ref={formRef}>
            <Form.Item
                name="category"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: "Please input one category for your item!"
                     }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Item Quantity"
                rules={[
                    {
                        required: true,
                        message: "Please input valid quantity numbers!",
                        pattern: "^([1-9][0-9]*|0)$"
                     }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="title"
                label="Item Name"
                rules={[
                    {
                        required: true,
                        message: "Please input a item name!"
                     }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="price"
                label="Item Price"
                rules={[
                    {
                        required: true,
                        pattern: "^[+]?\\d+(\\.{0,1}(\\d+?))?$",
                        message: "Please input a valid price!"
                     }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="description"
                label="Item Description"
                rules={[
                    {
                        required: true,
                        message: "Please input your item description!(max 200)"
                     }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="zipcode"
                label="Zip Code"
                rules={[
                    {
                        required: true,
                        pattern: '^([0-9][0-9]*|0)$',
                        len: 5,
                        message: "Please input a valid Zip Code!"
                     }
                ]}
            >
                <Input />
            </Form.Item>
            
        <Form.Item label="Image">
            <Form.Item
                name="uploadPost"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
                rules={[
                    {
                        required: true,
                        message: "Please select an image!"
                    }
                ]}
            >
                <Upload.Dragger name="files" beforeUpload={() => false}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
                </Upload.Dragger>
            </Form.Item>
        </Form.Item>
   </Form>
 );
});