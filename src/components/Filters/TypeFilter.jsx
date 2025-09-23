import React from "react";
import "../../css/Filters.css";

const TypeFilter = ({ filters, setFilters }) => {
  return (
    <select
      value={filters.type || ""}
      onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      className="filter-dropdown"
    >
      <option value="">Select Job Type</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Contract">Contract</option>
      <option value="Internship">Internship</option>
      <option value="Freelance">Freelance</option>
    </select>
  );
};

export default TypeFilter;
