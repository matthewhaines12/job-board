import { useState, useCallback } from "react";
import { getJobs } from "../services/apiJobs";

// useJobs hook: encapsulates job fetching logic and exposes state and setters
export default function useJobs(filters = {}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract query from filters.keyword or default to "developer"
  const query = filters.keyword || "developer";
  const location = filters.location || "";

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("🔍 Fetching jobs with filters:", filters);
      console.log("📋 Query:", query, "Location:", location);

      // Extract additional filters (everything except keyword and location)
      const { keyword: _, location: __, ...additionalFilters } = filters;

      const jobData = await getJobs(query, location, additionalFilters);
      
      // Ensure jobData is always an array
      const safeJobData = Array.isArray(jobData) ? jobData : [];
      console.log("✅ Fetched jobs:", safeJobData.length, "jobs");
      setJobs(safeJobData);
    } catch (err) {
      setError(err.message || "Failed to load jobs");
      console.error("❌ Error loading jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [query, location, filters]);

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
}
