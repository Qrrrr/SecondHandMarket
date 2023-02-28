import React from "react";
import { Card, Row, Col, Typography, message, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { searchUserPosts } from "../utils";

function UserProfile() {
    const[itemData, setItemData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      searchUserPosts()
        .then((data) => {
        setItemData(data);
        })
        .catch((err) => {
          message.error(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
  }, [itemData]);
  
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
                <DeleteOutlined key="delete" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
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
            <hr></hr>
            <div style={{ width: "80%", margin: "3rem auto" }}>
                <Row gutter={[16, 16]}>
                    {renderCards}
                {/* {itemData.length === 0 ? <div>No Item Found</div> : { renderCards }} */}
                </Row>
            </div>
        </>
    )
}
export default UserProfile;