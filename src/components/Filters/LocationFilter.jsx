import "../../css/Filters.css";

const LocationFilter = ({ filters, setFilters }) => {
  return (
    <div className="filter-group">
      <label className="filter-label">Location</label>
      <input
        type="text"
        value={filters.location || ""}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        placeholder="City, state, or 'Remote'"
        className="filter-input"
      />
    </div>
  );
};

export default LocationFilter;
