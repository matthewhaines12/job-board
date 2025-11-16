import { useState, useEffect } from "react";
import Filters from "../components/Filters/Filters";
import JobList from "../components/JobList/JobList";
import useJobs from "../hooks/useJobs";
import "../css/Home.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Load filters from localStorage or use defaults
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("jobFilters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          keyword: "",
          location: "",
          type: "",
          remote: "",
          min_salary: "",
          max_salary: "",
          date_posted: "",
          experience: "",
          field: "",
          deadline: "",
          sort_by: "relevance",
        };
  });

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jobFilters", JSON.stringify(filters));
  }, [filters]);

  // Pass filters and page to useJobs hook
  const { jobs, pagination, loading, error, searchJobs } = useJobs(
    filters,
    currentPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    searchJobs(pageNumber);
    // Scroll to top of job list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <div className="filters">
        <Filters
          filters={filters}
          setFilters={setFilters}
          onApplyChanges={() => searchJobs(1)}
          jobCount={pagination?.total_jobs || jobs.length}
        />
      </div>
      <div className="job-list">
        <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          filters={filters}
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
