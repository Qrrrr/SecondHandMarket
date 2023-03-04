import TextArea from "antd/lib/input/TextArea";
import { Select, Divider, Input, Tooltip, message, Button } from "antd";
import { filterpost } from "../utils";
import { FILTER_KEY } from "../constants";
import React, { useState } from "react";

const FilterPrice = (props) => {
  const [cate, setcate] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filtype, setfiltype] = useState(FILTER_KEY.all);
  const handlePrice = (value) => {
    const priceid = value;
    let min, max;
    switch (priceid) {
      case "2":
        min = "0";
        max = "25";
        break;
      case "3":
        min = "25";
        max = "50";
        break;
      case "4":
        min = "50";
        max = "100";
        break;
      case "5":
        min = "200";
        max = "300000";
        break;
      default:
        min = "0";
        max = "300000";
        break;
    }
    props.handleFilter({
      type: FILTER_KEY.price,
      cateinput: cate,
      min: min,
      max: max,
    });
    // props.filtertriger(props.filterOption);
  };

  const tirgfilt = () => {
    setTimeout(function () {
      props.filtertriger(props.filterOption);
    }, 1000);
    setTimeout(function () {
      setfiltype(FILTER_KEY.all);
      setMinPrice("");
      setMaxPrice("");
    }, 500);
  };
  //
  //for input
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    props.handleFilter({
      type: FILTER_KEY.price,
      cateinput: cate,
      min: minPrice,
      max: maxPrice,
    });
  };
  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);

    props.handleFilter({
      type: FILTER_KEY.price,
      cateinput: cate,
      min: minPrice,
      max: maxPrice,
    });
  };
  const handleFilterClick = () => {
    // message.info(minPrice);
    // message.info(maxPrice);
    tirgfilt();
  };
  const handleClearClick = () => {
    setMinPrice("");
    setMaxPrice("");
    props.handleFilter({
      type: FILTER_KEY.price,
      cateinput: cate,
      min: "",
      max: "",
    });
  };
  //

  const handleCheck = (value) => {};
  return (
    <div>
      <Divider style={{ height: "3px" }} />

      <div>
        <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>Price</h3>
        <Select
          shape="round"
          size="default"
          align="left"
          defaultValue="all"
          style={{ width: "120px" }}
          onChange={handlePrice}
        >
          <Select.Option value="1">All</Select.Option>
          <Select.Option value="2">$0 - $25</Select.Option>
          <Select.Option value="3">$25 - $50</Select.Option>
          <Select.Option value="4">$50 - $100</Select.Option>
          <Select.Option value="5">$200 +</Select.Option>
        </Select>
        <Button
          style={{ display: "flex", justifyContent: "center" }}
          onClick={tirgfilt}
        >
          confirm
        </Button>

        <Divider dashed style={{ height: "1px" }} />
        <div
          style={{
            display: "grid",
            placeItems: "start",
          }}
        >
          <Input
            prefix="$"
            placeholder="Min"
            type="string"
            value={minPrice}
            onChange={handleMinPriceChange}
            style={{ maxWidth: "70%" }}
          />
          <Input
            prefix="$"
            placeholder="Max"
            type="string"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            style={{ maxWidth: "70%" }}
          />
          <div>
            <Button type="primary" size="middle" onClick={handleFilterClick}>
              go
            </Button>
            <Button onClick={handleClearClick} style={{ margin: "1rem" }}>
              clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterPrice;
