// fetch post
import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, message, Spin } from "antd";
import SearchBar from "./SearchBar";
import {
  searchPosts,
  sortPosts,
  filterByCategory,
  filterpost,
  filterByRating,
} from "../utils";
import { SEARCH_KEY, FILTER_KEY } from "../constants";
import { Link } from "react-router-dom";
import SortFeature from "./SortFeature";
import FilterCategory from "./FilterCategory";
import FilterPrice from "./FilterPrice";
import FilterRating from "./FilterRating";

const ProductList = () => {
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchOption, setSearchOption] = useState({
    type: SEARCH_KEY.all,
    input: "",
    distance: "",
  });
  const [searchBarLoading, setSearchBarLoading] = useState(false);

  const [inputValue, setInputValue] = useState(""); // for reset searchBar input text only
  const handleSearch = (option) => {
    // console.log({ option });
    const { type, input, distance } = option;
    setSearchOption({ type: type, input: input, distance: distance });
    setSort("");
    setFilterCat("all");
    setFilterRating("0");
  };

  const [sort, setSort] = useState(""); // change sort type & reset sort type
  const handleSort = (type) => {
    setLoading(true);
    setSort(type);
    setInputValue("");
    setFilterCat("all");
    setFilterRating("0");
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

  // filter by category
  const [filterCat, setFilterCat] = useState("all");
  const handleFilterCategory = (catagory) => {
    setLoading(true);
    setInputValue("");
    setSort("");
    setFilterCat(catagory);
    setFilterRating("0");
    filterByCategory(catagory)
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

  // filter by price
  const [filterOption, setfilterOption] = useState({
    type: FILTER_KEY.all,
    cateinput: "",
    min: "",
    max: "",
  });

  const handleFilter = (option) => {
    const { type, cateinput, min, max } = option;
    setfilterOption({ type: type, cateinput: cateinput, min: min, max: max });
  };
  const filtertriger = (filterOption) => {
    setLoading(true);
    filterpost(filterOption)
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

  // filter by rating
  const [filterRating, setFilterRating] = useState("0");
  const handleFilterRating = (rating) => {
    setLoading(true);
    setInputValue("");
    setSort("");
    setFilterRating(rating);
    filterByRating(rating)
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
          <div className="filter-feature-container">
            <FilterCategory
              handleFilterCategory={handleFilterCategory}
              filterCat={filterCat}
            />

            <FilterPrice
              handleFilter={handleFilter}
              filtertriger={filtertriger}
              filterOption={filterOption}
            />
            <FilterRating
              handleFilterRating={handleFilterRating}
              filterRating={filterRating}
            />
          </div>
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
