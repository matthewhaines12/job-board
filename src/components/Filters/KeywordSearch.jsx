import "../../css/Filters.css";

const KeywordSearch = ({ filters, setFilters }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">Search Jobs</label>
      <input
        value={filters.keyword || ""}
        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
        type="text"
        placeholder="Job title, skills, or company name..."
        className="filter-input search-input"
      />
    </div>
  );
};

export default KeywordSearch;
