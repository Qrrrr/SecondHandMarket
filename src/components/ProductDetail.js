import { Row, Col, Button, Descriptions, message, Rate } from "antd";
import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import data from "../data";
import { addItemToCart, getPost, getPostByPostId } from "../utils";

const AddToCartButton = (itemId) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    addItemToCart(itemId)
      .then(() => message.success(`Successfully add item`))
      .catch((err) => message.error(err.message))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button loading={loading} type="primary" onClick={AddToCart}>
      Add to Cart
    </Button>
  );
};

const ProductDetail = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const itemData = location.state.item;

  const description = (itemData) => {
    return (
      <div>
        <Descriptions title={itemData.title}>
          <Descriptions.Item label="Email" span={3}>
            {itemData.sellerEmail}
          </Descriptions.Item>
          <Descriptions.Item
            label="Seller Rating"
            span={3}
            // style={{ display: "flex", justifyContent: "center" }}
          >
            {itemData.sellerRating === 0 ? (
              <span>Seller has not been rated yet!</span>
            ) : (
              <Rate
                value={itemData.sellerRating}
                count={5}
                disabled
                allowHalf
                style={{ fontSize: "85%" }}
              />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Price" span={3}>
            ${itemData.price}
          </Descriptions.Item>
          <Descriptions.Item label="Zipcode" span={3}>
            {itemData.zipcode}
          </Descriptions.Item>
          <Descriptions.Item label="Quantity" span={3}>
            {itemData.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {itemData.description}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {AddToCartButton(itemData.id)}
        </div>
      </div>
    );
  };

  return (
    <div
      className="productDetail"
      style={{ width: "100%", padding: "3rm 4rm" }}
    >
      <Row>
        <Col span={1}></Col>
        <Col span={10}>
          <img
            src={itemData.imageUrl}
            alt={itemData.title}
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid #ddd",
              boxShadow: "0 100px 100px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={10}>{description(itemData)}</Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
