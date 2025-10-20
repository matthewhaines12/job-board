import React from "react";
import "../../css/ResultsSummary.css";

const ResultsSummary = ({
  jobs = [],
  filters = {},
  loading = false,
  showSort = true,
  onSortChange = null,
}) => {
  if (loading) return null;

  // Ensure jobs is always an array
  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value !== "" && value !== "relevance"
  );

  const getFilterSummary = () => {
    const activeFilters = [];

    if (filters.keyword) activeFilters.push(`"${filters.keyword}"`);
    if (filters.location) activeFilters.push(`in ${filters.location}`);
    if (filters.type) activeFilters.push(filters.type);
    if (filters.remote) activeFilters.push(filters.remote);
    if (filters.min_salary || filters.max_salary) {
      const salaryText =
        filters.min_salary && filters.max_salary
          ? `$${filters.min_salary} - $${filters.max_salary}`
          : filters.min_salary
          ? `$${filters.min_salary}+`
          : `up to $${filters.max_salary}`;
      activeFilters.push(salaryText);
    }

    return activeFilters.slice(0, 3); // Show max 3 filters
  };

  const jobStats = {
    remote: safeJobs.filter((job) => job.job_is_remote).length,
    withSalary: safeJobs.filter((job) => job.job_min_salary || job.job_max_salary)
      .length,
    recentlyPosted: safeJobs.filter((job) => {
      if (!job.job_posted_at_datetime_utc) return false;
      const postedDate = new Date(job.job_posted_at_datetime_utc);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return postedDate > weekAgo;
    }).length,
  };

  return (
    <div className="results-summary">
      <div className="results-info">
        <div className="results-count">
          <span className="count-number">{safeJobs.length}</span>
          <span className="count-text">
            {safeJobs.length === 1 ? "job found" : "jobs found"}
          </span>
        </div>

        {hasActiveFilters && (
          <div className="active-filters">
            <span className="filter-label">Filtered by:</span>
            {getFilterSummary().map((filter, index) => (
              <span key={index} className="filter-tag">
                {filter}
              </span>
            ))}
            {getFilterSummary().length <
              Object.values(filters).filter(
                (v) => v && v !== "" && v !== "relevance"
              ).length && (
              <span className="more-filters">
                +
                {Object.values(filters).filter(
                  (v) => v && v !== "" && v !== "relevance"
                ).length - getFilterSummary().length}{" "}
                more
              </span>
            )}
          </div>
        )}
      </div>

      {safeJobs.length > 0 && (
        <div className="results-stats">
          <div className="stat-pills">
            {jobStats.remote > 0 && (
              <div className="stat-pill">
                <span className="stat-icon">🏠</span>
                <span>{jobStats.remote} remote</span>
              </div>
            )}
            {jobStats.withSalary > 0 && (
              <div className="stat-pill">
                <span className="stat-icon">💰</span>
                <span>{jobStats.withSalary} with salary</span>
              </div>
            )}
            {jobStats.recentlyPosted > 0 && (
              <div className="stat-pill">
                <span className="stat-icon">🆕</span>
                <span>{jobStats.recentlyPosted} recent</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSummary;
