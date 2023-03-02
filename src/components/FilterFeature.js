const FilterFeature = () => {
  //   const [checkedList, setCheckedList] = useState([]);
  const catagories = [
    { id: "1", value: "Javascript" },
    { id: "2", value: "Python" },
    { id: "3", value: "Java" },
    { id: "4", value: "Kotlin" },
    { id: "5", value: "Dart" },
    { id: "6", value: "C#" },
  ];

  const handleCheck = (value) => {};
  return (
    <div className="filter-feature-container">
      <h2>Filter</h2>
      <div>
        <h3>catagories</h3>
        <ul style={{ listStyleType: "none", padding: "10px" }}>
          {catagories.map((item) => (
            <li
              key={catagories.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={catagories.isChecked}
                onChange={() => handleCheck(catagories.id)}
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
