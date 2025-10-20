import React from "react";
import "../../css/Filters.css";

const FieldFilter = ({ filters, setFilters }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">Industry/Field</label>
      <select
        value={filters.field || ""}
        onChange={(e) => setFilters({ ...filters, field: e.target.value })}
        className="filter-dropdown"
      >
        <option value="">All Fields</option>
        <option value="Software Engineering">Software Engineering</option>
        <option value="Data Science">Data Science</option>
        <option value="Product Management">Product Management</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Finance">Finance</option>
        <option value="Operations">Operations</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
        <option value="Consulting">Consulting</option>
      </select>
    </div>
  );
};

export default FieldFilter;
