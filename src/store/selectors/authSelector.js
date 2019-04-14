import { createSelector } from 'reselect';

/**
 * @param {*} state - The initial state from the redux store
 */
const authStatusSelector = state => state.user.authStatus;
const authMessageSelector = state => state.user.message;
const authIsLoadingSelector = state => state.user.isLoading;

export const getAuthStatus = createSelector(authStatusSelector, status => (status ? 'success' : 'failure'));
export const getAuthMessage = createSelector(authMessageSelector, message => message);
export const getAuthIsLoading = createSelector(authIsLoadingSelector, isLoading => isLoading);
