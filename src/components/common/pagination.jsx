import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  let { itemCounts, pageSize, onPageChange, currentPage } = props;

  let pageCount = Math.ceil(itemCounts / pageSize);
  if(pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);
  
  return (
    <nav>
      <ul className="pagination">
        {pages.map((ele) => (
          <li key={ele} className = {(currentPage === ele) ? "page-item active" :"page-item"}>
            <a onClick={() => onPageChange(ele)} className="page-link">
              {ele}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
