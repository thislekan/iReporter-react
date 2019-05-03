import { createSelector } from 'reselect';

/**
 * @param {*} state - The initial state from the redux store
 */

const getIncidents = state => state.userIncidents.incidents;
const getIncidentsMessage = state => state.userIncidents.message;
const getIncidentsLoadingStatus = state => state.userIncidents.isLoading;
const getUserToken = state => state.user.token;
const getUserRole = state => state.user.isAdmin;

export const userIncidents = createSelector(getIncidents, incidents => incidents);
export const userIncidentsMessage = createSelector(getIncidentsMessage, message => message);
export const incidentsLoadingStatus = createSelector(getIncidentsLoadingStatus, status => status);
export const userToken = createSelector(getUserToken, token => token);
export const isUserAdmin = createSelector(getUserRole, isAdmin => isAdmin);
