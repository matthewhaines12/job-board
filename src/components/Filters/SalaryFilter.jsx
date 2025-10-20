import React from "react";
import "../../css/Filters.css";

const SalaryFilter = ({ filters, setFilters }) => {
  const handleMinSalaryChange = (e) => {
    setFilters({
      ...filters,
      min_salary: e.target.value ? parseInt(e.target.value) : "",
    });
  };

  const handleMaxSalaryChange = (e) => {
    setFilters({
      ...filters,
      max_salary: e.target.value ? parseInt(e.target.value) : "",
    });
  };

  return (
    <div className="filter-group">
      <label className="filter-label">Salary Range</label>
      <div className="salary-inputs">
        <input
          type="number"
          placeholder="Min salary"
          value={filters.min_salary || ""}
          onChange={handleMinSalaryChange}
          className="filter-input salary-input"
          min="0"
          step="1000"
        />
        <span className="salary-separator">to</span>
        <input
          type="number"
          placeholder="Max salary"
          value={filters.max_salary || ""}
          onChange={handleMaxSalaryChange}
          className="filter-input salary-input"
          min="0"
          step="1000"
        />
      </div>
    </div>
  );
};

export default SalaryFilter;
