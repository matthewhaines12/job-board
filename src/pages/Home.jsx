import React from "react";
import Filters from "../components/Filters/Filters";
import JobList from "../components/JobList/JobList";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="filters">
        <Filters />
      </div>
      <div className="job-list">
        <JobList />
      </div>
    </div>
  );
};

export default Home;
