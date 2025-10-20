import React from "react";
import "../../css/Filters.css";

const DeadlineFilter = ({ filters, setFilters }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">Application Deadline</label>
      <select
        value={filters.deadline || ""}
        onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
        className="filter-dropdown"
      >
        <option value="">Any Deadline</option>
        <option value="Today">Today</option>
        <option value="This Week">This Week</option>
        <option value="This Month">This Month</option>
        <option value="Next Month">Next Month</option>
        <option value="No Deadline">No Deadline</option>
      </select>
    </div>
  );
};

export default DeadlineFilter;
