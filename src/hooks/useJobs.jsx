import { useState, useCallback, useEffect } from 'react';
import { getJobs } from '../services/apiJobs';

// useJobs hook: encapsulates job fetching logic and exposes state and setters
const useJobs = (filters = {}, page = 1) => {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldLoadInitial, setShouldLoadInitial] = useState(true);

  const loadJobs = useCallback(
    async (pageNum = page) => {
      setLoading(true);
      setError(null);
      try {
        const response = await getJobs(filters, pageNum, 10);
        setJobs(response.jobs || []);
        setPagination(response.pagination);
      } catch (err) {
        const errorMessage =
          err.message || 'Failed to load jobs. Please try again.';
        setError(errorMessage);
        console.error('Error loading jobs:', err);
        setJobs([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    },
    [filters, page]
  );

  // Load initial jobs on mount
  useEffect(() => {
    if (shouldLoadInitial) {
      loadJobs(1);
      setShouldLoadInitial(false);
    }
  }, [shouldLoadInitial, loadJobs]);

  // Manual search function - only called when user clicks "Apply Changes"
  const searchJobs = useCallback(
    (pageNum = 1) => {
      loadJobs(pageNum);
    },
    [loadJobs]
  );

  return {
    jobs,
    pagination,
    loading,
    error,
    searchJobs,
  };
};

export default useJobs;
