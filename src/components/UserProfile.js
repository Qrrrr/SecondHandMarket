import React from "react";
import { Card, Row, Col, Typography, message, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { searchUserPosts } from "../utils";
import { BASE_URL } from "../constants";
import axios from "axios";
function UserProfile(props) {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchUserPosts()
      .then((data) => {
        console.log(data);
        setItemData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onDeletePost = (itemId) => {
    if (window.confirm(`Are you sure you want to delete this post?`)) {
      const newPost = itemData.filter((item) => item.id !== itemId);
      console.log("delete post ", newPost);
      const opt = {
        method: "DELETE",
        url: `${BASE_URL}/deletePost/${itemId}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios(opt)
        .then((res) => {
          console.log("delete result -> ", res);
          // case1: success
          if (res.status === 200) {
            // step1: set state
            setItemData(() => newPost);
          }
        })
        .catch((err) => {
          // case2: fail
          message.error("Fetch posts failed!");
          console.log("fetch posts failed: ", err.message);
        });
    }
  };

      const renderCards = itemData.map((item) => {
        // one row = 24, each col = 6
        // using lg, md, xs, the col size changes when users shrinks the screen
        return (
          <Col lg={6} md={8} xs={24}>
            <Card
              hoverable
              cover={
                <Link to={`/products/${item.id}`}>
                  <img
                    style={{ width: "100%", height: "250px" }}
                    alt={item.catagories}
                    src={item.src}
                  />
                </Link>
              }
              bordered={false}
              actions={[
                // <DeleteOutlined key="delete" />,
                  <Button
                    style={{ marginTop: "10px", marginLeft: "5px" }}
                    key = "delete"
                    type = "primary"
                    icon = {<DeleteOutlined />}
                    size = "small"
                    onClick={() => onDeletePost(item.id)}
                  >
                    Delete Post
                  </Button>
                // <EditOutlined key="edit" />,
                // <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Card.Meta
                description={
                  <>
                    <Typography.Text strong>${item.price}</Typography.Text>
                    <Typography.Paragraph
                      ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
                    >
                      {item.description}
                    </Typography.Paragraph>
                  </>
                }
              />
            </Card>
          </Col>
        );
      });

  return (
    <>
      <div className="profile">
        <Typography.Text strong>Listed Items:</Typography.Text>
      </div>
      <hr />
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <Row gutter={[16, 16]}>{renderCards}</Row>
      </div>
    </>
  );
}
export default UserProfile;