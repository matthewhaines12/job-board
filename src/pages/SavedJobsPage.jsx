import { useEffect, useState } from "react";
import { getSavedJobs } from "../services/apiUsers";
import { useAuth } from "../contexts/AuthContext";
import JobCard from "../components/JobList/JobCard";
import LoadingState from "../components/shared/LoadingState";
import ErrorState from "../components/shared/ErrorState";
import EmptyState from "../components/shared/EmptyState";
import useSavedJobs from "../hooks/useSavedJobs";
import "../css/SavedJobs.css";

const SavedJobsPage = () => {
  const { user, accessToken, loading: authLoading } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    isSaved,
    toggleSaveJob,
    setSavedJobs: initializeSavedJobs,
    loading: savingJob,
  } = useSavedJobs();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!user || !accessToken) {
        return;
      }
      try {
        setLoading(true);
        const data = await getSavedJobs(accessToken);
        // Handle different response structures
        const jobs = data.savedJobs || data.jobs || data || [];
        setSavedJobs(jobs);
        // Initialize saved job IDs in the hook
        initializeSavedJobs(jobs);
      } catch (error) {
        console.error("Failed to fetch saved jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) {
      fetchSavedJobs();
    }
  }, [user, accessToken, authLoading, initializeSavedJobs]);

  // Handle delete - remove from local state when deleted
  const handleToggleSave = async (jobId) => {
    const success = await toggleSaveJob(jobId);
    if (success && !isSaved(jobId)) {
      // Job was deleted, remove from saved jobs list
      setSavedJobs((prev) =>
        prev.filter((job) => job._id !== jobId && job.id !== jobId)
      );
    } else if (success && isSaved(jobId)) {
      // Job was saved, refetch to get the complete job data
      try {
        const data = await getSavedJobs(accessToken);
        const jobs = data.savedJobs || data.jobs || data || [];
        setSavedJobs(jobs);
        initializeSavedJobs(jobs);
      } catch (error) {
        console.error("Failed to refresh saved jobs:", error);
      }
    }
  };

  if (authLoading || loading) {
    return (
      <div className="saved-jobs-container">
        <LoadingState message="Loading your saved jobs..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="saved-jobs-container">
        <EmptyState
          icon=""
          title="Please log in to view saved jobs"
          description="Sign in to see your saved job listings"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="saved-jobs-container">
        <ErrorState message="Error loading saved jobs" suggestion={error} />
      </div>
    );
  }

  return (
    <div className="saved-jobs-container">
      <div className="job-list-header">
        <h2>Saved Jobs</h2>
        <p className="saved-count">
          {savedJobs.length === 0
            ? "No saved jobs"
            : savedJobs.length === 1
            ? "1 saved job"
            : `${savedJobs.length} saved jobs`}
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <EmptyState
          icon=""
          title="No saved jobs yet"
          description="Start saving jobs to view them here later"
        />
      ) : (
        <div className="jobs-grid">
          {savedJobs.map((job, index) => (
            <JobCard
              key={job._id || job.id || index}
              {...job}
              title={job.job_title}
              location={job.job_location}
              salary={job.job_salary || "Not specified"}
              description={job.job_description}
              type={job.job_employment_type}
              jobURL={job.job_apply_link}
              // Save functionality props
              isSaved={isSaved(job._id || job.id)}
              onToggleSave={handleToggleSave}
              savingJob={savingJob}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;
