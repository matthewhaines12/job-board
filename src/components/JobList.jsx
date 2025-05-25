// Structure of Right-Side Content Here
// Display Job Cards here

import React from "react";
import JobCard from "./JobCard";
import "../css/JobList.css";

const JobList = () => {
  return (
    <div className="job-list-container">
      <h2 className="job-sort">Recent Jobs:</h2>
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
      <JobCard />
    </div>
  );
};

export default JobList;
