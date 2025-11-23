import { refresh } from './apiAuth';

const USERS_API_URL = import.meta.env.VITE_API_USERS_URL;

const getSavedJobs = async (accessToken) => {
  try {
    let response = await fetch(`${USERS_API_URL}/saved-jobs`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 403) {
      const newData = await refresh();
      response = await fetch(`${USERS_API_URL}/saved-jobs`, {
        headers: {
          Authorization: `Bearer ${newData.accessToken}`,
        },
      });
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.error || `Failed to fetch saved jobs: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error('Error in getSavedJobs:', error);
    throw error;
  }
};

const saveJob = async (accessToken, jobID) => {
  try {
    let response = await fetch(`${USERS_API_URL}/save-job`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobID: jobID }),
    });

    if (response.status === 403) {
      const newData = await refresh();
      response = await fetch(`${USERS_API_URL}/save-job`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${newData.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobID: jobID }),
      });
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Failed to save job: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error in saveJob:', error);
    throw error;
  }
};

const deleteJob = async (accessToken, jobID) => {
  try {
    let response = await fetch(`${USERS_API_URL}/saved-jobs/${jobID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 403) {
      const newData = await refresh();
      response = await fetch(`${USERS_API_URL}/saved-jobs/${jobID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${newData.accessToken}`,
        },
      });
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Failed to delete job: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error in deleteJob:', error);
    throw error;
  }
};

export { getSavedJobs, saveJob, deleteJob };
