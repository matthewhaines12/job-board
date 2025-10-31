// Structure of Right-Side Content Here
// Display Job Cards here

import JobCard from "./JobCard";
import ResultsSummary from "./ResultsSummary";
import "../../css/JobList.css";

const JobList = ({
  jobs = [],
  loading = false,
  error = null,
  filters = {},
}) => {
  if (loading) {
    return (
      <div className="job-list-container">
        <div className="job-list-header">
          <h2 className="job-sort">Finding jobs...</h2>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Searching for the best opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-list-container">
        <div className="job-list-header">
          <h2 className="job-sort">Search Results</h2>
        </div>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Something went wrong</h3>
          <p className="error-message">{error}</p>
          <p className="error-suggestion">
            Please try adjusting your search filters or try again later.
          </p>
        </div>
      </div>
    );
  }

  const jobCountText =
    jobs.length === 1 ? "1 job found" : `${jobs.length} jobs found`;

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <h2 className="job-sort">Job Search Results</h2>
      </div>

      <ResultsSummary jobs={jobs} filters={filters} loading={loading} />

      {jobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No jobs match your criteria</h3>
          <p>Try adjusting your search filters:</p>
          <ul className="suggestions">
            <li>Use broader keywords</li>
            <li>Expand your location search</li>
            <li>Remove some filters</li>
            <li>Check your spelling</li>
          </ul>
        </div>
      ) : (
        <div className="jobs-grid">
          {Array.isArray(jobs) &&
            jobs.map((job, index) => (
              <JobCard
                key={job.job_id || job._id || index}
                // Pass all job properties to the enhanced JobCard
                {...job}
                // Legacy props for backward compatibility
                title={job.job_title}
                location={job.job_location}
                duration={job.job_posted_human_readable}
                salary={job.job_salary || "Not specified"}
                description={job.job_description}
                type={job.job_employment_type}
                jobURL={job.job_apply_link}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
