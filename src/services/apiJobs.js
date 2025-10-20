const API_URL = import.meta.env.VITE_API_URL;

export async function getJobs(query, location, additionalFilters = {}) {
  try {
    // Build query parameters from all filters
    const params = new URLSearchParams();

    // Main search parameters
    if (query) params.append("query", query);
    if (location) params.append("location", location);

    // Employment type and remote work
    if (additionalFilters.type)
      params.append("employment_type", additionalFilters.type);
    if (additionalFilters.remote)
      params.append("remote", additionalFilters.remote);

    // Salary filters
    if (additionalFilters.min_salary)
      params.append("min_salary", additionalFilters.min_salary);
    if (additionalFilters.max_salary)
      params.append("max_salary", additionalFilters.max_salary);

    // Date posted filter
    if (additionalFilters.date_posted)
      params.append("date_posted", additionalFilters.date_posted);

    // Sort by
    if (additionalFilters.sort_by)
      params.append("sort_by", additionalFilters.sort_by);

    // Legacy filters (keeping for backward compatibility)
    if (additionalFilters.duration)
      params.append("duration", additionalFilters.duration);
    if (additionalFilters.experience)
      params.append("experience", additionalFilters.experience);
    if (additionalFilters.field)
      params.append("field", additionalFilters.field);
    if (additionalFilters.deadline)
      params.append("deadline", additionalFilters.deadline);

    const url = `${API_URL}?${params.toString()}`;
    console.log("🌐 API Request URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log(`📦 Received ${data.length} jobs from API`);
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

// Alternative function for filters object (more convenient)
export async function getJobsWithFilters(filters) {
  const { keyword = "developer", location = "", ...otherFilters } = filters;
  return getJobs(keyword, location, otherFilters);
}

// Function to get job statistics (useful for displaying counts)
export async function getJobStats(filters = {}) {
  try {
    const jobs = await getJobsWithFilters(filters);

    return {
      total: jobs.length,
      remote: jobs.filter((job) => job.job_is_remote).length,
      recentlyPosted: jobs.filter((job) => {
        if (!job.job_posted_at_datetime_utc) return false;
        const postedDate = new Date(job.job_posted_at_datetime_utc);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return postedDate > weekAgo;
      }).length,
      withSalary: jobs.filter((job) => job.job_min_salary || job.job_max_salary)
        .length,
    };
  } catch (error) {
    console.error("Error fetching job stats:", error);
    return { total: 0, remote: 0, recentlyPosted: 0, withSalary: 0 };
  }
}
