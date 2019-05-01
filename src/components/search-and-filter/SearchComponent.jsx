import React from 'react';
import style from '../../styles/SearchReports.css';

const SearchFeature = () => (
  <div className={style['filter-div']}>
    <label htmlFor="filter list">Search Incident</label>
    <select name="filter list" id="filter-options">
      <option value="">Select option</option>
      <option value="id">Incident ID</option>
      <option value="location">Location</option>
    </select>
    <input
      type="text"
      name=""
      id="filter-value"
      placeholder="Please enter your search term here"
    />
    <div className={style['search-btns']}>
      <button className={style['filter-list-btn']}>Search</button>
      <button className={style['cancel-search-btn']}>Clear Search</button>
    </div>
  </div>
);

export default SearchFeature;
