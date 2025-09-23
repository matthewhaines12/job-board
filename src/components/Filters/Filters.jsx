// Structure of left-Side Content Here

import React from "react";
import { useState } from "react";
import Button from "./Button";
import KeywordSearch from "./KeywordSearch";
import LocationFilter from "./LocationFilter";
import TypeFilter from "./TypeFilter";
import DurationFilter from "./DurationFilter";
import ExperienceFilter from "./ExperienceFilter";
import FieldFilter from "./FieldFilter";
import DeadlineFilter from "./DeadlineFilter";
import "../../css/Filters.css";

const Filters = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    type: "",
    duration: "",
    experience: "",
    field: "",
    deadline: "",
  });
  return (
    <div className="filter-container">
      <div className="button-container">
        <Button text="Login" route="/login" type="login-btn" />
        <Button text="Signup" route="/signup" type="signup-btn" />
      </div>
      <h2>Filters:</h2>
      <KeywordSearch filters={filters} setFilters={setFilters} />
      <LocationFilter filters={filters} setFilters={setFilters} />
      <TypeFilter filters={filters} setFilters={setFilters} />
      <FieldFilter filters={filters} setFilters={setFilters} />
      <ExperienceFilter filters={filters} setFilters={setFilters} />
      <DurationFilter filters={filters} setFilters={setFilters} />
      <DeadlineFilter filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default Filters;
