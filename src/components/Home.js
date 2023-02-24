import React, { useState, useEffect } from "react";
import { Tabs, message, Row, Col, Button } from "antd";
import axios from "axios";
import ProductList from "./ProductList";

import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../constants";
import SearchBar from "./SearchBar";

const { TabPane } = Tabs;
function Home(props) {
  {
    /**edit by linghongfei */
  }
  return (
    <div className="home">
      <ProductList />
    </div>
  );
  {
    /** */
  }
}
export default Home;
