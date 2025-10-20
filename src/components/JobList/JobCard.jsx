import { useState } from "react";
import "../../css/JobCard.css";

const JobCard = ({
  // Core job data from API
  job_title = "Software Engineering Intern",
  employer_name = "Company Name",
  employer_logo = null,
  job_city = "Altoona",
  job_state = "PA",
  job_country = "USA",
  job_employment_type = "Full-time",
  job_posted_at_datetime_utc = null,
  job_salary_currency = "USD",
  job_min_salary = null,
  job_max_salary = null,
  job_salary_period = "year",
  job_description = "This is an internship for computer science majors who are ready for the most challenging coding tests.",
  job_is_remote = false,
  job_apply_link = "https://www.linkedin.com/",
  job_highlights = {},
  job_category = null,
  job_required_education = null,
  job_required_experience = null,

  // Legacy props for backward compatibility
  title,
  location,
  duration,
  salary,
  description,
  type,
  jobURL,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Helper functions for data processing
  const formatLocation = () => {
    const cityState = [job_city, job_state].filter(Boolean).join(", ");
    const location_display = cityState
      ? `${cityState}, ${job_country}`
      : job_country;

    if (job_is_remote) {
      return cityState ? `${location_display} (Remote)` : "Remote";
    }
    return location_display || "Location not specified";
  };

  const formatSalary = () => {
    if (!job_min_salary && !job_max_salary) return null;

    const currency = job_salary_currency || "USD";
    const period = job_salary_period || "year";

    const formatNumber = (num) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    };

    if (job_min_salary && job_max_salary) {
      return `${formatNumber(job_min_salary)} – ${formatNumber(
        job_max_salary
      )} / ${period}`;
    } else if (job_min_salary) {
      return `${formatNumber(job_min_salary)}+ / ${period}`;
    } else {
      return `Up to ${formatNumber(job_max_salary)} / ${period}`;
    }
  };

  const formatPostedDate = () => {
    if (!job_posted_at_datetime_utc) return null;

    const postedDate = new Date(job_posted_at_datetime_utc);
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Posted 1 day ago";
    if (diffDays < 30) return `Posted ${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.ceil(diffDays / 30);
      return months === 1
        ? "Posted 1 month ago"
        : `Posted ${months} months ago`;
    }
    return "Posted over a year ago";
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getRemoteBadge = () => {
    if (job_is_remote) return "Remote";
    return "On-site";
  };

  // Use new props or fall back to legacy props
  const displayTitle = job_title || title;
  const displayEmployer = employer_name || "Company Name";
  const displayDescription = job_description || description;
  const displayApplyLink = job_apply_link || jobURL;
  const displayEmploymentType = job_employment_type || type;

  const handleExpandedText = () => {
    setExpanded(!expanded);
  };

  const handleViewJob = () => {
    window.open(displayApplyLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="job-card">
      {/* Header with title and company */}
      <div className="job-header">
        <div className="job-title-section">
          {employer_logo && (
            <img
              src={employer_logo}
              alt={`${displayEmployer} logo`}
              className="employer-logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <div className="title-company">
            <h3
              className="job-title"
              onClick={handleViewJob}
              title={displayTitle}
            >
              {displayTitle}
            </h3>
            <p className="employer-name">{displayEmployer}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="job-badges">
          <span
            className={`remote-badge ${job_is_remote ? "remote" : "onsite"}`}
          >
            {getRemoteBadge()}
          </span>
          {displayEmploymentType && (
            <span className="employment-type-badge">
              {displayEmploymentType}
            </span>
          )}
        </div>
      </div>

      {/* Job details */}
      <div className="job-details">
        <div className="job-meta">
          <div className="meta-item">
            <span className="meta-icon">📍</span>
            <span className="job-location">{formatLocation()}</span>
          </div>

          {formatSalary() && (
            <div className="meta-item">
              <span className="meta-icon">💰</span>
              <span className="job-salary">{formatSalary()}</span>
            </div>
          )}

          {formatPostedDate() && (
            <div className="meta-item">
              <span className="meta-icon">🕒</span>
              <span className="job-posted">{formatPostedDate()}</span>
            </div>
          )}
        </div>

        {/* Job category/industry tag */}
        {job_category && (
          <div className="job-tags">
            <span className="category-tag">{job_category}</span>
          </div>
        )}

        {/* Description */}
        <div className="job-description-container">
          <p
            className={`job-description ${
              expanded ? "expanded" : "cutoff-text"
            }`}
          >
            {expanded
              ? displayDescription
              : truncateDescription(displayDescription, 150)}
          </p>
          {displayDescription && displayDescription.length > 150 && (
            <button className="toggle-description" onClick={handleExpandedText}>
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {/* Qualifications preview */}
        {job_highlights?.Qualifications && !expanded && (
          <div className="qualifications-preview">
            <h4>Key Requirements:</h4>
            <ul>
              {job_highlights.Qualifications.slice(0, 3).map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
              {job_highlights.Qualifications.length > 3 && (
                <li className="more-qualifications">
                  +{job_highlights.Qualifications.length - 3} more...
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Apply button */}
      <div className="job-actions">
        <button className="apply-button" onClick={handleViewJob}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
