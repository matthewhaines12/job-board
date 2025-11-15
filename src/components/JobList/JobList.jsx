// Structure of Right-Side Content Here
// Display Job Cards here

import JobCard from "./JobCard";
import ResultsSummary from "./ResultsSummary";
import LoadingState from "../shared/LoadingState";
import ErrorState from "../shared/ErrorState";
import EmptyState from "../shared/EmptyState";
import useSavedJobs from "../../hooks/useSavedJobs";
import "../../css/JobList.css";

const JobList = ({
  jobs = [],
  loading = false,
  error = null,
  filters = {},
}) => {
  const { isSaved, toggleSaveJob, loading: savingJob } = useSavedJobs();
  if (loading) {
    return (
      <div className="job-list-container">
        <div className="job-list-header">
          <h2 className="job-sort">Finding jobs...</h2>
        </div>
        <LoadingState message="Searching for the best opportunities..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-list-container">
        <div className="job-list-header">
          <h2 className="job-sort">Search Results</h2>
        </div>
        <ErrorState
          message="Something went wrong"
          suggestion="Please try adjusting your search filters or try again later."
        />
      </div>
    );
  }

  jobs.length === 1 ? "1 job found" : `${jobs.length} jobs found`;

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <h2 className="job-sort">Job Search Results</h2>
      </div>

      <ResultsSummary jobs={jobs} filters={filters} loading={loading} />

      {jobs.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No jobs match your criteria"
          description="Try adjusting your search filters:"
          suggestions={[
            "Use broader keywords",
            "Expand your location search",
            "Remove some filters",
            "Check your spelling",
          ]}
        />
      ) : (
        <div className="jobs-grid">
          {Array.isArray(jobs) &&
            jobs.map((job, index) => {
              const jobId = job._id || job.id;
              return (
                <JobCard
                  key={jobId || index}
                  // Pass all job properties to the enhanced JobCard
                  {...job}
                  // Legacy props for backward compatibility
                  title={job.job_title}
                  location={job.job_location}
                  salary={job.job_salary || "Not specified"}
                  description={job.job_description}
                  type={job.job_employment_type}
                  jobURL={job.job_apply_link}
                  // Save functionality props
                  isSaved={isSaved(jobId)}
                  onToggleSave={toggleSaveJob}
                  savingJob={savingJob}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default JobList;
