import { useState } from "react";

const FilterFeature = (props) => {
  const [checkedCategory, setCheckedCategory] = useState("all");
  const categories = [
    { id: "0", value: "all" },
    { id: "1", value: "car" },
    { id: "2", value: "phone" },
    { id: "3", value: "furniture" },
    { id: "4", value: "kitchenware" },
    { id: "5", value: "...." },
    { id: "6", value: "....." },
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
  console.log(checkedCategory);

  if (props.filterCat !== checkedCategory) {
    setCheckedCategory("all");
  }
  return (
    <div className="filter-feature-container">
      {/* <h2>Filter</h2> */}
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
              {item.value}
            </li>
          ))}
        </ul>
      </div>
      <div>price</div>
    </div>
  );
};
export default FilterFeature;
