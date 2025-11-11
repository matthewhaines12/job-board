import { useState } from "react";
import Filters from "../components/Filters/Filters";
import JobList from "../components/JobList/JobList";
import useJobs from "../hooks/useJobs";
import "../css/Home.css";

const Home = () => {
  // Lift filter state up to Home component with new filters
  const [filters, setFilters] = useState({
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
  });

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
