import React, { forwardRef } from "react";
import { Form, Upload, Input, Select, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

export const PostForm = forwardRef((props, formRef) => {
    const { Option } = Select;
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
                name="Category"
                label="Category"
                rules={[
                    {
                        required: true,
                        message: "Please Select One Category!"
                     }
                ]}
            >
             <Select

             >
                <Option value="HomeGarden"> Home & Garden </Option>
                <Option value="Electronics"> Electronics </Option>
                <Option value="Clothes"> Clothes </Option>
                <Option value="Sporting"> Sporting Goods </Option>
                <Option value="Toys"> Toys </Option>
                <Option value="Jewelry"> Jewelry & Watches </Option>
                <Option value="Others"> Others </Option>
             </Select>
            </Form.Item>
            <Form.Item
                name="ContactInfo"
                label="Contact Info"
                rules={[
                    {
                        required: true,
                        message: "Please input your Contact Information!"
                     }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="ItemName"
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
                name="ItemPrice"
                label="Item Price"
                rules={[
                    {
                        required: true,
                        pattern: '^([1-9][0-9]*|0)$',
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
                        message: "Please input your item description!"
                     }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="ZipCode"
                label="Zip Code"
                rules={[
                    {
                        required: true,
                        pattern: '^([1-9][0-9]*|0)$',
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