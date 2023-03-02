import { Row, Col, Button, Descriptions, message } from "antd";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data";
import { addItemToCart, getPost } from "../utils";

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
  const { productId } = useParams(); // object of K/V from url
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPost()
      .then((posts) => {
        const targetPost = posts.find((post) => post.id == productId);
        setItemData(targetPost);
      })
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  }, []);

  console.log(itemData);
  const description = (itemData) => {
    return (
      <div>
        <Descriptions title={itemData.title}>
          <Descriptions.Item label="Email" span={3}>
            {itemData.email}
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
            src={itemData.image}
            alt={itemData.title}
            style={{ height: "100%", width: "100%", display: "block" }}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={10}>{description(itemData)}</Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
