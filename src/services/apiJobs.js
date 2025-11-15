const API_URL = import.meta.env.VITE_API_URL;

const getJobs = async (filters = {}) => {
  try {
    // Build query parameters from all filters
    const params = new URLSearchParams(); // Built in JS class that creates URL query strings

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
    console.log("API Request URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch jobs: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export { getJobs };
