import React from "react";
import "../../css/Filters.css";

const SortFilter = ({ filters, setFilters }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">Sort by</label>
      <select
        value={filters.sort_by || "relevance"}
        onChange={(e) => setFilters({ ...filters, sort_by: e.target.value })}
        className="filter-dropdown"
      >
        <option value="relevance">Relevance</option>
        <option value="date">Date Posted</option>
        <option value="salary_high">Salary (High to Low)</option>
        <option value="salary_low">Salary (Low to High)</option>
        <option value="company">Company Name</option>
      </select>
    </div>
  );
};

export default SortFilter;
