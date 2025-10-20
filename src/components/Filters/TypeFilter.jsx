import React from "react";
import "../../css/Filters.css";

const TypeFilter = ({ filters, setFilters }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">Employment Type</label>
      <select
        value={filters.type || ""}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="filter-dropdown"
      >
        <option value="">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
        <option value="Freelance">Freelance</option>
      </select>
    </div>
  );
};

export default TypeFilter;
