import React from "react";
import { Card, Row, Col, Typography, message, Space, Button, Spin, Form } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { review } from "../utils";

function UserReviews(props) {
  const [itemData, setItemData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItemData(props)
  }, []);

    const onFinish = (values) => {
        console.log(values);
        review(values) // api from utils.js
            .then(() => {
            message.success(`Thank you for your feedback!`);
            })
            .catch((err) => {
            message.error(err.message);
            })
            .finally(() => {});
        };

      const renderForms = itemData.map((item) => {
        // one row = 24, each col = 6
        // using lg, md, xs, the col size changes when users shrinks the screen
        return (
          <Col lg={12} md={16} xs={24}>
            <Form onFinish={onFinish} 
            initialValues={{user: `${item}`}}
            >
                <Form.Item 
                label="Seller"
                name="user"
                >
                {`${item}`}
                </Form.Item>

                <Form.Item label="ratings" name="rating"
                    rules={[
                        {
                            required: true,
                            message: "Please give a rating from 0 - 5",
                            pattern:  "^([0-4](\.\d+)?|5(\.0+)?)$"
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