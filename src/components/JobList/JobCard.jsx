import React, { useState } from "react";
import "../../css/JobCard.css";

const JobCard = ({
  title = "Software Engineering Intern",
  location = "Altoona, PA",
  duration = "May 25th, 2025 - Jul 26th 2025",
  salary = "$22.00 Hourly",
  description = "This is an internship for computer science majors who are ready for the most challenging coding tests. This is an internship for computer science majors who are ready for the most challenging coding tests. Requirements include: Minimum 3rd Year Computer Science Student, Must be a sigma boy, Looks maxxer and mew, Mog all the betas. This is an internship for computer science majors who are ready for the most challenging coding tests. This is an internship for computer science majors who are ready for the most challenging coding tests. Requirements include: Minimum 3rd Year Computer Science Student, Must be a sigma boy, Looks maxxer and mew, Mog all the betas",
  type = "Remote",
  jobURL = "https://www.linkedin.com/",
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandedText = () => {
    setExpanded(!expanded);
  };

  const handleViewJob = () => {
    window.open(jobURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="job-card">
      <h3 className="job-title">{title}</h3>
      <p className="job-location">{location}</p>
      <p className="job-duration">{duration}</p>
      <p className="job-salary">{salary}</p>

      <div className="job-description-container">
        <p
          className={`job-description ${expanded ? "expanded" : "cutoff-text"}`}
        >
          {description}
        </p>
        <button className="toggle-description" onClick={handleExpandedText}>
          {expanded ? "show less" : "show more"}{" "}
        </button>
      </div>

      {/* <p className="job-type">{type}</p> */}

      <button className="view-job" onClick={handleViewJob}>
        View Job
      </button>
    </div>
  );
};

export default JobCard;
