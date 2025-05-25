import React from "react";
import "../../css/Filters.css";

const KeywordSearch = ({ filters, setFilters }) => {
  return (
    <input
      value={filters.KeywordSearch}
      type="text"
      placeholder="Search by Job Title, Skill, or Company"
      className="filter-input"
    />
  );
};

export default KeywordSearch;
