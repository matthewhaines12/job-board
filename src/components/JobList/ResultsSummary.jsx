import "../../css/ResultsSummary.css";

const ResultsSummary = ({
  jobs = [],
  filters = {},
  loading = false,
  pagination = null,
}) => {
  if (loading) return null;

  // Use total jobs from pagination if available, otherwise use jobs.length
  const totalJobs = pagination?.total_jobs || jobs.length;

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
    remote: jobs.filter((job) => job.job_is_remote).length,
    withSalary: jobs.filter((job) => job.job_min_salary || job.job_max_salary)
      .length,
    recentlyPosted: jobs.filter((job) => {
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
          <span className="count-number">{totalJobs}</span>
          <span className="count-text">{totalJobs === 1 ? "job" : "jobs"}</span>
        </div>

        {hasActiveFilters && jobs.length > 0 && (
          <div className="active-filters">
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
                ).length - getFilterSummary().length}
              </span>
            )}
          </div>
        )}

        {jobs.length > 0 && (
          <div className="results-stats">
            {jobStats.remote > 0 && (
              <span className="stat-text">{jobStats.remote} remote</span>
            )}
            {jobStats.withSalary > 0 && (
              <span className="stat-text">
                {jobStats.withSalary} with salary
              </span>
            )}
            {jobStats.recentlyPosted > 0 && (
              <span className="stat-text">
                {jobStats.recentlyPosted} recent
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsSummary;
