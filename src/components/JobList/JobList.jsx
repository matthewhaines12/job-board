// Structure of Right-Side Content Here
// Display Job Cards here

import JobCard from './JobCard';
import ResultsSummary from './ResultsSummary';
import LoadingState from '../shared/LoadingState';
import ErrorState from '../shared/ErrorState';
import EmptyState from '../shared/EmptyState';
import useSavedJobs from '../../hooks/useSavedJobs';
import { useAuth } from '../../contexts/AuthContext';
import '../../css/JobList.css';

const JobList = ({
  jobs = [],
  loading = false,
  error = null,
  filters = {},
  pagination = null,
  currentPage = 1,
  onPageChange = null,
}) => {
  const { isSaved, toggleSaveJob, loading: savingJob } = useSavedJobs();
  const { user } = useAuth();

  const renderPagination = () => {
    if (!pagination || !onPageChange) return null;

    const { current_page, total_pages } = pagination;
    if (total_pages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const showEllipsisStart = current_page > 3;
      const showEllipsisEnd = current_page < total_pages - 2;

      // Always show first page
      pages.push(1);

      // Show ellipsis or pages near start
      if (showEllipsisStart) {
        pages.push('...');
      } else if (total_pages > 1) {
        for (let i = 2; i < Math.min(4, total_pages); i++) {
          pages.push(i);
        }
      }

      // Show current page and adjacent pages
      if (current_page > 3 && current_page < total_pages - 2) {
        for (let i = current_page - 1; i <= current_page + 1; i++) {
          if (i > 1 && i < total_pages && !pages.includes(i)) {
            pages.push(i);
          }
        }
      }

      // Show ellipsis or pages near end
      if (showEllipsisEnd) {
        pages.push('...');
      } else if (total_pages > 3) {
        for (
          let i = Math.max(total_pages - 2, current_page + 1);
          i < total_pages;
          i++
        ) {
          if (!pages.includes(i)) {
            pages.push(i);
          }
        }
      }

      // Always show last page
      if (total_pages > 1 && !pages.includes(total_pages)) {
        pages.push(total_pages);
      }

      return pages;
    };

    return (
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
        >
          Previous
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-page ${
                  current_page === page ? 'active' : ''
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          className="pagination-btn"
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === total_pages}
        >
          Next
        </button>
      </div>
    );
  };
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

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <h2 className="job-sort">Job Search Results</h2>
      </div>

      <ResultsSummary
        jobs={jobs}
        filters={filters}
        loading={loading}
        pagination={pagination}
      />

      {renderPagination()}

      {jobs.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No jobs match your criteria"
          description="Try adjusting your search filters:"
          suggestions={[
            'Use broader keywords',
            'Expand your location search',
            'Remove some filters',
            'Check your spelling',
          ]}
        />
      ) : (
        <>
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
                    salary={job.job_salary || 'Not specified'}
                    description={job.job_description}
                    type={job.job_employment_type}
                    jobURL={job.job_apply_link}
                    // Save functionality props
                    isSaved={isSaved(job._id)}
                    onToggleSave={toggleSaveJob}
                    savingJob={savingJob}
                    isLoggedIn={!!user}
                  />
                );
              })}
          </div>
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default JobList;
