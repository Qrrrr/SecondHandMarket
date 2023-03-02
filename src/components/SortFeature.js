import { Dropdown, Button } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const SortFeature = (props) => {
  const [sortType, setSortType] = useState();

  const changeSortType = (e) => {
    setSortType(e.key);
    props.handleSort(e.key);
  };

  const menuProps = {
    items: [
      { label: "Price - High to Low", key: "pricehightolow" },
      { label: "Price - Low to High", key: "price" },
    ],
    onClick: changeSortType,
  };

  return (
    // <div className="sort-feature-container">
    <div style={{ justifyContent: "flex-end" }}>
      <Dropdown menu={menuProps} trigger="click">
        <Button shape="round" size="small">
          {props.sortType
            ? menuProps.items.find((item) => item.key === props.sortType).label
            : "Sort by"}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};
export default SortFeature;
