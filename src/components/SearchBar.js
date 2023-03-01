import React, { useState } from "react";
import { Input, Radio, Select } from "antd";

import { SEARCH_KEY } from "../constants";

const { Search } = Input;

function SearchBar(props) {
  const [searchType, setSearchType] = useState(SEARCH_KEY.keyword);
  const [error, setError] = useState("");
  const [distance, setDistance] = useState("2");

  const changeSearchType = (e) => {
    // console.log("radio checked", e.target.value);
    const searchType = e.target.value;
    setSearchType(searchType);
    setError("");
    if (searchType === SEARCH_KEY.keyword) {
      setDistance("2");
    }
  };

  const handleSearch = (value) => {
    if (searchType !== SEARCH_KEY.all && value === "") {
      setError("Please input your search keyword!");
      return;
    }
    setError("");
    props.handleSearch({ type: searchType, input: value, distance: distance });
  };

  const changeDistance = (value) => {
    setDistance(value);
  };

  return (
    <div className="search-bar">
      <Search
        placeholder={`input ${
          searchType === SEARCH_KEY.keyword ? "search text" : "a zipcode"
        }`}
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        loading={props.loading}
      />
      <p className="error-msg">{error}</p>
      <Radio.Group
        // defaultValue={SEARCH_KEY.keyword}
        onChange={changeSearchType}
        value={searchType}
        className="search-type-group"
      >
        <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
        <Radio value={SEARCH_KEY.distance}>Location</Radio>
      </Radio.Group>

      {searchType === SEARCH_KEY.distance && (
        <Select
          defaultValue="2 miles"
          //value={distance}
          onChange={changeDistance}
          className="post-tab-select"
        >
          <Select.Option value="2">2 miles</Select.Option>
          <Select.Option value="5">5 miles</Select.Option>
          <Select.Option value="10">10 miles</Select.Option>
        </Select>
      )}
    </div>
  );
}
export default SearchBar;
