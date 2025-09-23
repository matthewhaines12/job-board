import "../../css/Filters.css";

// Filter is an object that contains the current state of all filter values
// setFilter is a function used to update the current filter state
const LocationFilter = ({ filters, setFilters }) => {
  return (
    <select
      value={filters.location || ""} // sets the props state to the current selected option, if undefined it defaults to an empty string,
      onChange={(e) => setFilters({ ...filters, location: e.target.value })} // listens for any change in the dropdown selection
      // e.target.value represents the value of the selected option from the dropdown
      // setFilters updates the filters object by setting a new location value
      // ...filters (spread operator)
      className="filter-dropdown"
    >
      <option value="">Select Location</option>
      <option value="Remote">Remote</option>
      <option value="Pittsburgh, PA">Pittsburgh, PA</option>
      <option value="New York, NY">New York, NY</option>
      <option value="San Francisco, CA">San Francisco, CA</option>
    </select>
  );
};

export default LocationFilter;
