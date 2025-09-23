import React from "react";
import "../../css/Filters.css";

const FieldFilter = ({ filters, setFilters }) => {
  return (
    <select
      value={filters.field || ""}
      onChange={(e) => setFilters({ ...filters, field: e.target.value })}
      className="filter-dropdown"
    >
      <option value="">Select Field</option>
      <option value="Software Engineering">Software Engineering</option>
      <option value="Data Science">Data Science</option>
      <option value="Product Management">Product Management</option>
      <option value="Design">Design</option>
      <option value="Marketing">Marketing</option>
      <option value="Sales">Sales</option>
      <option value="Finance">Finance</option>
      <option value="Operations">Operations</option>
    </select>
  );
};

export default FieldFilter;
