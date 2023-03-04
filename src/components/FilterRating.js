import { Divider, Rate } from "antd";

import { useState } from "react";

const FilterRating = (props) => {
  const [checkedRating, setCheckedRating] = useState("0");
  const ratings = [
    { id: "0", value: "0", displayValue: "All" },
    { id: "1", value: "1", displayValue: "1" },
    { id: "2", value: "2", displayValue: "2" },
    { id: "3", value: "3", displayValue: "3" },
    { id: "4", value: "4", displayValue: "4" },
    { id: "5", value: "5", displayValue: "5" },
  ];

  const handleCheck = (e) => {
    const value = e.target.value;
    if (checkedRating === value) {
      setCheckedRating("0");
      props.handleFilterRating("0");
    } else {
      setCheckedRating(value);
      props.handleFilterRating(value);
    }
  };

  if (props.filterRating !== checkedRating) {
    setCheckedRating("0");
  }

  return (
    <div>
      <Divider style={{ height: "3px" }} />
      <div>
        <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>Seller Ratings</h3>
        <ul style={{ listStyleType: "none", padding: "0px" }}>
          {ratings.map((item) => (
            <li
              key={ratings.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="radio"
                name="category"
                onChange={handleCheck}
                checked={props.filterRating === item.value}
                value={item.value}
                style={{ marginRight: "0.5rem" }}
              />
              {item.displayValue === "All" ? (
                item.displayValue
              ) : (
                <Rate
                  value={item.displayValue}
                  count={5}
                  disabled
                  style={{ fontSize: "85%" }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default FilterRating;
