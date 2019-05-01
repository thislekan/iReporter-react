import React from 'react';
import style from '../../styles/FilterReport.css';

function FilterFeature() {
  return (
    <div className={style['select-report']}>
      <label htmlFor="select report">Sort reported incidents by status</label>
      <select name="select report" id="sort-report">
        <option value="all">All</option>
        <option value="red-flag">Red flags</option>
        <option value="intervention">Intervention</option>
        <option value="draft">Draft</option>
        <option value="rejected">Rejected</option>
        <option value="resolved">Resolved</option>
        <option value="under-investigation">Under Investigation</option>
      </select>
    </div>
  );
}

export default FilterFeature;
