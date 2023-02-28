import React, { useState } from "react";
import { Input, Radio } from "antd";

import { SEARCH_KEY } from "../constants";

const { Search } = Input;

function SearchBar(props) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.distance);
    const [error, setError] = useState("");

    const changeSearchType = (e) => {
        console.log('radio checked', e.target.value);
        const searchType = e.target.value;
        setSearchType(searchType);
        setError("");
    };

    const handleSearch = (value) => {
        if (searchType !== SEARCH_KEY.all && value === "") {
            setError("Please input your search keyword!");
        return;
        }
        setError("");
        props.handleSearch({ type: searchType, input: value });
    };

    return (
        <div className="search-bar">
          <Search
            placeholder="input search text or a zip code"
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
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
        </div>
    )
}
export default SearchBar;