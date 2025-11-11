import { useState, useCallback } from "react";
import { getJobs } from "../services/apiJobs";

// useJobs hook: encapsulates job fetching logic and exposes state and setters
const useJobs = (filters = {}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching jobs with filters:", filters);

      const jobData = await getJobs(filters);
      // Ensure jobData is always an array
      const safeJobData = Array.isArray(jobData) ? jobData : [];
      console.log("Fetched jobs:", safeJobData.length, "jobs");
      setJobs(safeJobData);
    } catch (err) {
      setError(err.message || "Failed to load jobs");
      console.error("Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Manual search function - only called when user clicks "Apply Changes"
  const searchJobs = useCallback(() => {
    loadJobs();
  }, [loadJobs]);

  return {
    jobs,
    loading,
    error,
    searchJobs, // Manual search function for the Apply Changes button
  };
};

export default useJobs;
