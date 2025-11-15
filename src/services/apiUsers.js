import { refresh } from "./apiAuth";

const USERS_API_URL = import.meta.env.VITE_API_URL3;

const getSavedJobs = async (accessToken) => {
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

  if (!response.ok) throw new Error("Failed to fetch saved jobs");

  return await response.json();
};

const saveJob = async (accessToken, jobID) => {
  let response = await fetch(`${USERS_API_URL}/save-job/${jobID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 403) {
    const newData = await refresh();
    response = await fetch(`${USERS_API_URL}}/save-job/${jobID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${newData.accessToken}`,
      },
    });
  }

  if (!response.ok) throw new Error("Failed to save job");

  return await response.json();
};

const deleteJob = async (accessToken, jobID) => {
  let response = await fetch(`${USERS_API_URL}/saved-jobs/${jobID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 403) {
    const newData = await refresh();
    response = await fetch(`${USERS_API_URL}}/saved-jobs/${jobID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${newData.accessToken}`,
      },
    });
  }

  if (!response.ok) throw new Error("Failed to delete job");

  return await response.json();
};

export { getSavedJobs, saveJob, deleteJob };
