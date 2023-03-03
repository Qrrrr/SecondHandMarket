import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { signup } from "../utils";
import { BASE_URL } from "../constants";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const formItemLayout = {
  //label 所占百分比
  labelCol: {
    xs: { span: 24 },
    //
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    // form length
    sm: { span: 16, offset: 5 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

function Register(props) {
  const [form] = Form.useForm();
  const onFinish = (data) => {
    signup(data)
      .then(() => {
        message.success("Registration succeed!");
        props.history.push("/login");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };
  const phoneRegExp = /^[(]\d{3}[)]\d{3}[-]\d{4}$/;

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      className="register"
    >
      <Form.Item
        name="email"
        rules={[{ type: "email", required: true, message: "Please input a valid email!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="firstName"
        rules={[
          { required: true, message: "Please input your first name!" },
          {
            max: 16,
            message: "Sorry but the max length is 16"
          }
        ]}
      >
        <Input placeholder="firstname" />
      </Form.Item>

      <Form.Item
        name="lastName"
        rules={[          
          { required: true, message: "Please input your last name!" },
          {
            max: 16,
            message: "Sorry but the max length is 16"
          }
        ]}
      >
        <Input placeholder="lastname" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            max: 16,
            message: "Max length 200"
          }
        ]}
      >
        <Input prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[
          { required: true, message: "Please input your phone!" },
          {
            pattern: phoneRegExp,
            message: 'Please enter phone number in the format of (xxx)xxx-xxxx'
          },
      ]}
      >
        <Input placeholder="phone" />
      </Form.Item>

      <Form.Item
        name="userName"
        rules={[
          { 
          required: true, 
          message: "Please input your username!",
          },
          {
            min: 6,
            max: 10,
            message: "Username length should be 6 - 10"
          }
      ]}
      >
        <Input placeholder="userName" />
      </Form.Item>

      <Form.Item
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input placeholder="address" />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className="register-btn">
          Register
        </Button>
        Or <Link to="/login">Login now!</Link>
      </Form.Item>
    </Form>
  );
}

export default Register;
