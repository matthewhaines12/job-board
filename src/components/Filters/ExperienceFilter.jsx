import React from "react";
import "../../css/Filters.css";

const ExperienceFilter = ({ filters, setFilters }) => {
  return (
    <select
      value={filters.experience || ""}
      onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
      className="filter-dropdown"
    >
      <option value="">Select Experience Level</option>
      <option value="Entry Level">Entry Level</option>
      <option value="Junior">Junior (1-2 years)</option>
      <option value="Mid Level">Mid Level (3-5 years)</option>
      <option value="Senior">Senior (5+ years)</option>
      <option value="Lead">Lead/Principal</option>
    </select>
  );
};

export default ExperienceFilter;
