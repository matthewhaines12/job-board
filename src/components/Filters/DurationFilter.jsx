import React from "react";
import "../../css/Filters.css";

const DurationFilter = ({ filters, setFilters }) => {
  return (
    <select
      value={filters.duration || ""}
      onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
      className="filter-dropdown"
    >
      <option value="">Select Duration</option>
      <option value="1-3 months">1-3 months</option>
      <option value="3-6 months">3-6 months</option>
      <option value="6-12 months">6-12 months</option>
      <option value="1+ years">1+ years</option>
      <option value="Permanent">Permanent</option>
    </select>
  );
};

export default DurationFilter;
