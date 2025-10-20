import React from "react";
import "../../css/Filters.css";

const DatePostedFilter = ({ filters, setFilters }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">Date Posted</label>
      <select
        value={filters.date_posted || ""}
        onChange={(e) =>
          setFilters({ ...filters, date_posted: e.target.value })
        }
        className="filter-dropdown"
      >
        <option value="">Any time</option>
        <option value="1d">Last 24 hours</option>
        <option value="3d">Last 3 days</option>
        <option value="7d">Last week</option>
        <option value="14d">Last 2 weeks</option>
        <option value="30d">Last month</option>
      </select>
    </div>
  );
};

export default DatePostedFilter;
