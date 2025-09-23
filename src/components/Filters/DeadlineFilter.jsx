import React from "react";
import "../../css/Filters.css";

const DeadlineFilter = ({ filters, setFilters }) => {
  return (
    // The onChange handler updates just the deadline field in the filters object while preserving the rest of the filters.
    // It ensures your select stays in sync with React state (a controlled component).
    <select
      value={filters.deadline || ""}
      onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
      className="filter-dropdown"
    >
      <option value="">Select Application Deadline</option>
      <option value="Today">Today</option>
      <option value="This Week">This Week</option>
      <option value="This Month">This Month</option>
      <option value="Next Month">Next Month</option>
      <option value="No Deadline">No Deadline</option>
    </select>
  );
};

export default DeadlineFilter;
