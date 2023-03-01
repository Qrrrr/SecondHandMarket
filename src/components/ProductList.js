// fetch post
import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message, Spin } from "antd";
import SearchBar from "./SearchBar";
import { searchPosts } from "../utils";
import { SEARCH_KEY } from "../constants";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    input: "",
    distance: "",
  });

  const handleSearch = (option) => {
    // console.log({ option });
    const { type, input, distance } = option;
    setSearchOption({ type: type, input: input, distance: distance });
  };

  // console.log(searchOption);
  useEffect(() => {
    setLoading(true);
    searchPosts(searchOption)
      .then((data) => {
        setItemData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchOption]);

  // console.log(itemData);
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
                src={item.image}
              />
            </Link>
          }
          bordered={false}
        >
          <Card.Meta
            description={
              <>
                <Typography.Text strong>${item.price}</Typography.Text>
                <Typography.Paragraph
                  strong
                  ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
                >
                  {item.title}
                </Typography.Paragraph>
                <Typography.Text>Location: {item.zipcode}</Typography.Text>
              </>
            }
          />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: "90%", margin: "3rem auto" }}>
      <SearchBar handleSearch={handleSearch} loading={loading} />
      <br></br>
      <br></br>
      <div>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {itemData.length === 0 ? (
              <div className="no-item-found-container">
                <Typography.Text>No Item Found</Typography.Text>
              </div>
            ) : (
              renderCards
            )}
          </Row>
        )}
      </div>
    </div>
  );
};
export default ProductList;
