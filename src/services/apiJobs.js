const API_URL = import.meta.env.VITE_API_URL;

const getJobs = async (filters = {}, page = 1, limit = 25) => {
  try {
    // Build query parameters from all filters
    const params = new URLSearchParams(); // Built in JS class that creates URL query strings

    // Pagination parameters
    params.append("page", page);
    params.append("limit", limit);

    // Main search parameters
    if (filters.keyword) params.append("query", filters.keyword);
    if (filters.location) params.append("location", filters.location);

    // Employment type and remote work
    if (filters.type) params.append("employment_type", filters.type);
    if (filters.remote) params.append("remote", filters.remote);

    // Salary filters
    if (filters.min_salary) params.append("min_salary", filters.min_salary);
    if (filters.max_salary) params.append("max_salary", filters.max_salary);

    // Date posted filter
    if (filters.date_posted) params.append("date_posted", filters.date_posted);

    // Sort by
    if (filters.sort_by) params.append("sort_by", filters.sort_by);

    // Additional filters
    if (filters.experience) params.append("experience", filters.experience);
    if (filters.field) params.append("field", filters.field);
    if (filters.deadline) params.append("deadline", filters.deadline);

    const url = `${API_URL}?${params.toString()}`;

    const response = await fetch(url);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.error ||
          `Failed to fetch jobs: ${response.status} ${response.statusText}`
      );
    }

    // Return the full response with pagination data
    if (data && data.jobs && data.pagination) {
      return {
        jobs: data.jobs,
        pagination: data.pagination,
        filters_applied: data.filters_applied,
      };
    }

    // Fallback for old API format
    if (Array.isArray(data)) {
      return { jobs: data, pagination: null };
    } else if (data && Array.isArray(data.jobs)) {
      return { jobs: data.jobs, pagination: null };
    } else if (data && Array.isArray(data.data)) {
      return { jobs: data.data, pagination: null };
    }

    return { jobs: [], pagination: null };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export { getJobs };
