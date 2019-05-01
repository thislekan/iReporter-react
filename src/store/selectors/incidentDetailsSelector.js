import { createSelector } from 'reselect';

/**
 * @param {*} state - The initial state from the redux store
 */

const incidentSelector = state => state.incident;

const incidentDetails = createSelector(incidentSelector, incident => incident);

export default incidentDetails;
