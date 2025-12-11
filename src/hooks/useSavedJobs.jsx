import { useState, useCallback } from 'react';
import { saveJob, deleteJob } from '../services/apiUsers';
import { useAuth } from '../contexts/AuthContext';

const useSavedJobs = () => {
  const { accessToken, user } = useAuth();
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isSaved = useCallback(
    (jobId) => {
      return savedJobIds.has(jobId);
    },
    [savedJobIds]
  );

  const handleSaveJob = useCallback(
    async (jobId) => {
      if (!jobId) {
        setError('Invalid job ID');
        return false;
      }

      if (!accessToken) {
        setError('Please log in to save jobs');
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        await saveJob(accessToken, jobId);
        setSavedJobIds((prev) => new Set([...prev, jobId]));
        return true;
      } catch (err) {
        console.error('Failed to save job:', err);
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [accessToken]
  );

  const handleDeleteJob = useCallback(
    async (jobId) => {
      if (!accessToken) {
        setError('Please log in to manage saved jobs');
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        await deleteJob(accessToken, jobId);
        setSavedJobIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(jobId);
          return newSet;
        });
        return true;
      } catch (err) {
        console.error('Failed to delete job:', err);
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [accessToken]
  );

  const toggleSaveJob = useCallback(
    async (jobId) => {
      if (isSaved(jobId)) {
        return await handleDeleteJob(jobId);
      } else {
        return await handleSaveJob(jobId);
      }
    },
    [isSaved, handleSaveJob, handleDeleteJob]
  );

  const setSavedJobs = useCallback((jobs) => {
    const jobIds = jobs.map((job) => job._id || job.id).filter(Boolean);
    setSavedJobIds(new Set(jobIds));
  }, []);

  return {
    isSaved,
    handleSaveJob,
    handleDeleteJob,
    toggleSaveJob,
    setSavedJobs,
    loading,
    error,
  };
};

export default useSavedJobs;
