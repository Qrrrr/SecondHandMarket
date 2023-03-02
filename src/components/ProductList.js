// fetch post
import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message, Spin } from "antd";
import SearchBar from "./SearchBar";
import { searchPosts, sortPosts } from "../utils";
import { SEARCH_KEY } from "../constants";
import { Link } from "react-router-dom";
import SortFeature from "./SortFeature";
import FilterFeature from "./FilterFeature";

const ProductList = () => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    input: "",
    distance: "",
  });
  const [searchBarLoading, setSearchBarLoading] = useState(false);

  const [sort, setSort] = useState("");

  const handleSearch = (option) => {
    // console.log({ option });
    const { type, input, distance } = option;
    setSearchOption({ type: type, input: input, distance: distance });
    setSort("");
  };

  const [inputValue, setInputValue] = useState("");

  const handleSort = (type) => {
    setLoading(true);
    setSort(type);
    setInputValue("");
    sortPosts(type)
      .then((data) => {
        setItemData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // console.log(searchOption);
  useEffect(() => {
    setLoading(true);
    setSearchBarLoading(true);
    searchPosts(searchOption)
      .then((data) => {
        setItemData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
        setSearchBarLoading(false);
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
                src={item.imageUrl}
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
    <div
      style={{
        width: "95%",
        margin: "3rem auto",
      }}
    >
      <SearchBar
        handleSearch={handleSearch}
        loading={searchBarLoading}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <div className="sort-feature-container">
        <SortFeature handleSort={handleSort} sortType={sort} />
      </div>
      <hr></hr>

      <Row className="All">
        <Col span={3} className="left-side">
          <FilterFeature />
        </Col>
        <Col span={1}></Col>
        <Col span={20} className="right-side">
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
        </Col>
      </Row>
    </div>
  );
};
export default ProductList;
