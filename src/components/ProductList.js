// fetch post
import { useEffect, useState } from "react";
import { Card, Row, Col, Typography } from "antd";
import data from "../data";
import axios, { Axios } from "axios";

const ProductList = () => {
  const [itemData, setItemData] = useState([]); // for search option
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     Axios.post("后端api link").then((response) => {
  //       if (response.data.success) {
  //         setItemData(response.data.itemData);
  //       } else {
  //         alert("Failed to fetch item data");
  //       }
  //     });
  //   }, []);

  const renderCards = data.map((item) => {
    // one row = 24, each col = 6
    // using lg, md, xs, the col size changes when users shrinks the screen
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable
          cover={
            <a href={`/products/${item.id}`}>
              <img
                style={{ width: "100%", height: "250px" }}
                alt={item.catagories}
                src={item.src}
              />
            </a>
          }
          bordered={false}
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
                <Typography.Text>Location: {item.postal_code}</Typography.Text>
              </>
            }
          />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "90%", margin: "3rem auto" }}>
      <div>
        <Row gutter={[16, 16]}>{renderCards} </Row>
      </div>
    </div>
  );
};
export default ProductList;
