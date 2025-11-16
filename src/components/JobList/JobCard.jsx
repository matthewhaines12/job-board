import { useState } from "react";
import "../../css/JobCard.css";

const JobCard = ({
  _id,
  job_title,
  employer_name,
  employer_logo,
  job_city,
  job_state,
  job_country,
  job_employment_type,
  job_posted_at_datetime_utc,
  job_salary_currency,
  job_min_salary,
  job_max_salary,
  job_salary_period,
  job_description,
  job_is_remote,
  job_apply_link,
  job_highlights,
  job_category,
  isSaved = false,
  onToggleSave = null,
  savingJob = false,
  isLoggedIn = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const formatLocation = () => {
    const cityState = [job_city, job_state].filter(Boolean).join(", ");
    const location = cityState ? `${cityState}, ${job_country}` : job_country;
    return job_is_remote
      ? cityState
        ? `${location} (Remote)`
        : "Remote"
      : location || "Location not specified";
  };

  const formatSalary = () => {
    if (!job_min_salary && !job_max_salary) return null;

    const formatNumber = (num) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: job_salary_currency || "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);

    const period = job_salary_period || "year";

    if (job_min_salary && job_max_salary) {
      return `${formatNumber(job_min_salary)} – ${formatNumber(
        job_max_salary
      )} / ${period}`;
    }
    return job_min_salary
      ? `${formatNumber(job_min_salary)}+ / ${period}`
      : `Up to ${formatNumber(job_max_salary)} / ${period}`;
  };

  const formatPostedDate = () => {
    if (!job_posted_at_datetime_utc) return null;

    const diffDays = Math.ceil(
      (new Date() - new Date(job_posted_at_datetime_utc)) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.ceil(diffDays / 30);
      return months === 1 ? "1 month ago" : `${months} months ago`;
    }
    return "Over a year ago";
  };

  const truncateText = (text, maxLength = 400) => {
    if (!text || text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return (
      (lastSpace > maxLength * 0.8
        ? truncated.substring(0, lastSpace)
        : truncated
      ).trim() + "..."
    );
  };

  const formatDescription = (text) => {
    if (!text) return null;

    // Split by newlines and process each line
    return text
      .split("\n")
      .map((line, index) => {
        const trimmedLine = line.trim();

        // Check if line starts with bullet point indicators
        if (trimmedLine.match(/^[•\-\*●]/)) {
          return (
            <li
              key={index}
              style={{ marginLeft: "0", listStylePosition: "inside" }}
            >
              {trimmedLine.replace(/^[•\-\*●]\s*/, "")}
            </li>
          );
        }

        // Regular text line
        if (trimmedLine) {
          return (
            <p key={index} style={{ margin: "0 0 8px 0" }}>
              {trimmedLine}
            </p>
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  const handleSaveClick = () => {
    if (!isLoggedIn) {
      alert("Please login to save jobs");
      return;
    }
    onToggleSave(_id);
  };

  return (
    <div className="job-card">
      {/* Header */}
      <div className="job-header">
        <div className="job-title-section">
          {employer_logo && (
            <img
              src={employer_logo}
              alt={employer_name}
              className="employer-logo"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <div>
            <h3 className="job-title">{job_title}</h3>
            <p className="employer-name">{employer_name}</p>
          </div>
        </div>
        <div className="job-badges">
          <span className={`badge ${job_is_remote ? "remote" : "onsite"}`}>
            {job_is_remote ? "Remote" : "On-site"}
          </span>
          {job_employment_type && (
            <span className="badge">{job_employment_type}</span>
          )}
        </div>
      </div>

      {/* Meta info */}
      <div className="job-meta">
        <div className="meta-item">
          <span>{formatLocation()}</span>
        </div>
        {formatSalary() && (
          <div className="meta-item">
            <span>{formatSalary()}</span>
          </div>
        )}
        {formatPostedDate() && (
          <div className="meta-item">
            <span>{formatPostedDate()}</span>
          </div>
        )}
      </div>

      {/* Category */}
      {job_category && <span className="category-tag">{job_category}</span>}

      {/* Description */}
      <div className="job-description-container">
        <div className="job-description">
          {formatDescription(
            expanded ? job_description : truncateText(job_description)
          )}
        </div>
        {job_description && job_description.length > 400 && (
          <button
            className="toggle-description"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Key Requirements - Always show when available */}
      {job_highlights?.Qualifications &&
        job_highlights.Qualifications.length > 0 && (
          <div className="qualifications">
            <h4>Key Requirements</h4>
            <ul>
              {(expanded
                ? job_highlights.Qualifications
                : job_highlights.Qualifications.slice(0, 3)
              ).map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
            {!expanded && job_highlights.Qualifications.length > 3 && (
              <p className="more-items">
                +{job_highlights.Qualifications.length - 3} more
              </p>
            )}
          </div>
        )}

      {/* Actions */}
      <div className="job-actions">
        {onToggleSave && (
          <button
            className={`save-button ${isSaved ? "saved" : ""}`}
            onClick={handleSaveClick}
            disabled={savingJob}
            title={
              !isLoggedIn
                ? "Login to save jobs"
                : isSaved
                ? "Remove from saved"
                : "Save job"
            }
          >
            {savingJob ? (
              <span className="save-spinner">⋯</span>
            ) : (
              <svg
                className="save-icon"
                viewBox="0 0 24 24"
                fill={isSaved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            )}
          </button>
        )}
        <button
          className="apply-button"
          onClick={() =>
            window.open(job_apply_link, "_blank", "noopener,noreferrer")
          }
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
