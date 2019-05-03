// import axios from 'axios';
import request from '../../utils/request';
import typeGenerator from './typeGenerator';

export const incidentType = typeGenerator('GET_INCIDENTS');

export const loading = (type, status) => ({ type, status });
export const getIncidentsSuccess = (type, data) => ({ type, data });
export const getIncidentsFailure = (type, message) => ({ type, message });

export const getIncidents = (token, isAdmin) => async (dispatch) => {
  let allIncidents;
  let route = 'user/incidents';
  const verb = 'get';
  if (isAdmin) route = 'incidents';

  try {
    dispatch(loading(incidentType.loading, true));
    const result = await request({ route, verb });
    const { data } = result.data;
    allIncidents = data;
    if (isAdmin) allIncidents = data.incidents;
    return dispatch(getIncidentsSuccess(incidentType.success, allIncidents));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(getIncidentsFailure(incidentType.failure, errorResponse));
  }
};
