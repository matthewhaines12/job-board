import { useState, useCallback } from "react";
import { getJobs } from "../services/apiJobs";

// useJobs hook: encapsulates job fetching logic and exposes state and setters
const useJobs = (filters = {}) => {
  // Load jobs from localStorage or use empty array
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("currentJobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const jobData = await getJobs(filters);
      // Ensure jobData is always an array
      const safeJobData = Array.isArray(jobData) ? jobData : [];
      setJobs(safeJobData);
      // Save to localStorage
      localStorage.setItem("currentJobs", JSON.stringify(safeJobData));
    } catch (err) {
      const errorMessage =
        err.message || "Failed to load jobs. Please try again.";
      setError(errorMessage);
      console.error("Error loading jobs:", err);
      setJobs([]); // Clear jobs on error
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load jobs on mount
  // useEffect(() => {
  //   loadJobs();
  // }, []);

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
