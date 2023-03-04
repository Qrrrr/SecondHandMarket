import { useState } from "react";

const FilterCategory = (props) => {
  const [checkedCategory, setCheckedCategory] = useState("all");
  const categories = [
    { id: "0", value: "all", displayValue: "All" },
    { id: "1", value: "Car", displayValue: "Car" },
    { id: "2", value: "Electronics", displayValue: "Electronics" },
    { id: "3", value: "Furniture", displayValue: "Furniture" },
    { id: "4", value: "Kitchen", displayValue: "Kitchen" },
    { id: "5", value: "Office", displayValue: "Office" },
    { id: "6", value: "Education", displayValue: "Education" },
    { id: "6", value: "Appliances", displayValue: "Appliances" },
  ];

  const handleCheck = (e) => {
    const value = e.target.value;
    if (checkedCategory === value) {
      setCheckedCategory("all");
      props.handleFilterCategory("all");
    } else {
      setCheckedCategory(value);
      props.handleFilterCategory(value);
    }
  };
  // console.log(checkedCategory);

  if (props.filterCat !== checkedCategory) {
    setCheckedCategory("all");
  }
  return (
    <div>
      <h3 style={{ fontWeight: "bold", fontSize: "20px" }}>categories</h3>
      <ul style={{ listStyleType: "none", padding: "0px" }}>
        {categories.map((item) => (
          <li
            key={categories.id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              name="category"
              onChange={handleCheck}
              checked={props.filterCat === item.value}
              value={item.value}
              style={{ marginRight: "0.5rem" }}
            />
            {item.displayValue}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FilterCategory;
