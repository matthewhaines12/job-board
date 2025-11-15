import { useState, useEffect } from "react";
import Filters from "../components/Filters/Filters";
import JobList from "../components/JobList/JobList";
import useJobs from "../hooks/useJobs";
import "../css/Home.css";

const Home = () => {
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

  // Pass filters to useJobs hook
  const { jobs, loading, error, searchJobs } = useJobs(filters);

  return (
    <div className="home-container">
      <div className="filters">
        <Filters
          filters={filters}
          setFilters={setFilters}
          onApplyChanges={searchJobs}
          jobCount={jobs.length}
        />
      </div>
      <div className="job-list">
        <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default Home;
