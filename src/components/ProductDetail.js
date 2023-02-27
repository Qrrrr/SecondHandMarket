import { Row, Col, Button, Descriptions, message } from "antd";
import { React, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data";
import { addItemToCart } from "../utils";

const AddToCartButton = (itemId) => {
  const [loading, setLoading] = useState(false);

  const AddToCart = () => {
    setLoading(true);
    // addItemToCart(itemId)
    //   .then(() => message.success(`Successfully add item`))
    //   .catch((err) => message.error(err.message))
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <Button loading={loading} type="primary" onClick={AddToCart}>
      Add to Cart
    </Button>
  );
};

const ProductDetail = () => {
  const { productId } = useParams(); // object of K/V from url
  const thisProduct = data.find((prod) => prod.id === productId);
  const description = (thisProduct) => {
    return (
      <div>
        <Descriptions title="Product Info">
          <Descriptions.Item label="Email" span={3}>
            {thisProduct.email}
          </Descriptions.Item>
          <Descriptions.Item label="Price" span={3}>
            ${thisProduct.price}
          </Descriptions.Item>
          <Descriptions.Item label="Postal Code" span={3}>
            {thisProduct.postal_code}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            {thisProduct.status}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={3}>
            {thisProduct.description}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {AddToCartButton(thisProduct.id)}
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
            src={thisProduct.src}
            alt={thisProduct.catagories}
            style={{ height: "100%", width: "100%", display: "block" }}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={10}>{description(thisProduct)}</Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
