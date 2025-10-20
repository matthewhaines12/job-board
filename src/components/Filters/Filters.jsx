// Structure of left-Side Content Here

import AuthButton from "./AuthButton";
import KeywordSearch from "./KeywordSearch";
import LocationFilter from "./LocationFilter";
import TypeFilter from "./TypeFilter";
import RemoteFilter from "./RemoteFilter";
import SalaryFilter from "./SalaryFilter";
import DatePostedFilter from "./DatePostedFilter";
import DurationFilter from "./DurationFilter";
import ExperienceFilter from "./ExperienceFilter";
import FieldFilter from "./FieldFilter";
import DeadlineFilter from "./DeadlineFilter";
import SortFilter from "./SortFilter";
import ApplyChange from "./ApplyChange";
import "../../css/Filters.css";

const Filters = ({ filters, setFilters, onApplyChanges, jobCount = 0 }) => {
  const handleClearFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      type: "",
      remote: "",
      min_salary: "",
      max_salary: "",
      date_posted: "",
      duration: "",
      experience: "",
      field: "",
      deadline: "",
      sort_by: "relevance",
    });
  };

  return (
    <div className="filter-container">
      <div className="button-container">
        <AuthButton text="Login" route="/login" type="login-btn" />
        <AuthButton text="Signup" route="/signup" type="signup-btn" />
      </div>

      <div className="filter-header">
        <h2>Filters</h2>
        {jobCount > 0 && (
          <span className="job-count">{jobCount} jobs found</span>
        )}
      </div>

      <div className="filters-section">
        <KeywordSearch filters={filters} setFilters={setFilters} />
        <LocationFilter filters={filters} setFilters={setFilters} />
        <TypeFilter filters={filters} setFilters={setFilters} />
        <RemoteFilter filters={filters} setFilters={setFilters} />
        <SalaryFilter filters={filters} setFilters={setFilters} />
        <DatePostedFilter filters={filters} setFilters={setFilters} />
        <SortFilter filters={filters} setFilters={setFilters} />

        {/* Advanced Filters */}
        <div className="advanced-filters">
          <h3>Advanced Filters</h3>
          <FieldFilter filters={filters} setFilters={setFilters} />
          <ExperienceFilter filters={filters} setFilters={setFilters} />
          <DurationFilter filters={filters} setFilters={setFilters} />
          <DeadlineFilter filters={filters} setFilters={setFilters} />
        </div>
      </div>

      <div className="filter-actions">
        <button
          className="clear-filters-btn"
          onClick={handleClearFilters}
          type="button"
        >
          Clear All
        </button>
        <ApplyChange
          text="Apply Filters"
          type="filters-btn"
          onClick={onApplyChanges}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default Filters;
