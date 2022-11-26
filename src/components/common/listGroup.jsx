import React from "react";
const ListGroup = (props) => {
  let { items, onItemSelect, textProperty, valueProperty, selectedItem } = props;
  return (
    <ul className="list-group">
      {items.map((ele) => (
        <li
          onClick={() => onItemSelect(ele)}
          style={{ cursor: "pointer" }}
          key={ele[valueProperty]}
          className={ selectedItem === ele ? "list-group-item active" :"list-group-item"}
        >
          {ele[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
