import React from "react";
import "../../css/Filters.css";

const RemoteFilter = ({ filters, setFilters }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">Work Type</label>
      <select
        value={filters.remote || ""}
        onChange={(e) => setFilters({ ...filters, remote: e.target.value })}
        className="filter-dropdown"
      >
        <option value="">All Work Types</option>
        <option value="remote">Remote</option>
        <option value="hybrid">Hybrid</option>
        <option value="onsite">On-site</option>
      </select>
    </div>
  );
};

export default RemoteFilter;
