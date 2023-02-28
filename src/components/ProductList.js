// fetch post
import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message, Space, Button } from "antd";
import data from "../data";
import SearchBar from "./SearchBar";
import { addItemToCart, getPost } from "../utils";
import { SEARCH_KEY } from "../constants";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [itemData, setItemData] = useState([]); // for search option
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPost()
      .then((data) => {
        setItemData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    input: "",
  });

  // there are now two types of search, search by keyword or search by distance,
  // not sure if need to provide distance input for distance search
  const handleSearch = (option) => {
    const { type, input } = option;
    setSearchOption({ type: type, input: input });
  };

  // useEffect(() => {
  //   setLoading(true);
  //   searchPosts(searchOption)
  //     .then((data) => {
  //       setItemData(data);
  //     })
  //     .catch((err) => {
  //       message.error(err.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [searchOption]);

  // data will later be changed to itemData for real tests1
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
      <SearchBar handleSearch={handleSearch} />
      <br></br>
      <br></br>
      <div>
        <Row gutter={[16, 16]}>
          {renderCards}
          {/* {itemData.length === 0 ? <div>No Item Found</div> : { renderCards }} */}
        </Row>
      </div>
    </div>
  );
};
export default ProductList;
