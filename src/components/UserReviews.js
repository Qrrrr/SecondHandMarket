import React from "react";
import { Card, Row, Col, Typography, message, Space, Button, Spin, Form } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { review } from "../utils";
import { useLocation } from "react-router-dom";

function UserReviews(props) {
  const location = useLocation();
  const { sellerData } = location.state;
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setItemData(props)
  // }, []);

    const onFinish = (values) => {
        console.log(values);
        const formData = new FormData();
        formData.append("sellerUserName", values.sellerUserName);
        formData.append("rating", values.rating);
        formData.append("comment", values.comment);
        review(formData) // api from utils.js
            .then(() => {
            message.success(`Thank you for your feedback!`);
            })
            .catch((err) => {
            message.error(err.message);
            })
            .finally(() => {});
        };

      const renderForms = sellerData.map((sellername) => {
        // one row = 24, each col = 6
        // using lg, md, xs, the col size changes when users shrinks the screen
        return (
          <Col lg={12} md={16} xs={24}>
            <Form onFinish={onFinish} 
            initialValues={{sellerUserName: sellername}}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            >
                <Form.Item 
                label="Seller"
                name="sellerUserName"
                initialValue={`${sellername}`}
                >
                <input/>
                </Form.Item>

                <Form.Item label="ratings" name="rating"
                    rules={[
                        {
                            required: true,
                            message: "Please give a rating from 0 - 5",
                            pattern:  "^([0-4](\.[0-9]+)?|5(\.0+)?)$"
                        },
                    ]}
                >
                    <input />
                </Form.Item>
                <Form.Item label="comments" name="comment"
                    rules={[
                        {
                            message: "Please give us your comments",
                        },
                    ]}
                >
                    <input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                     sumbit
                  </Button>
                </Form.Item>
            </Form>

          </Col>
        );
      });

  return (
    <>
      <div className="review">
        <Typography.Text strong>Please provide your feedback</Typography.Text>
      </div>
      <hr />
      {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          <div style={{ width: "80%", margin: "3rem auto" }}>
            <Row gutter={[16, 16]}>{renderForms}</Row>
          </div>
        )}
    </>
  );
}
export default UserReviews;
