import axios from 'axios';
import API_URL from '../../constant';
import typeGenerator from './typeGenerator';

export const incidentType = typeGenerator('GET_INCIDENTS');

const loading = (type, status) => ({ type, status });
const getIncidentsSuccess = (type, data) => ({ type, data });
const getIncidentsFailure = (type, message) => ({ type, message });

const getIncidents = (token, isAdmin) => async (dispatch) => {
  let route = 'user/incidents';
  if (isAdmin) route = 'incidents';
  const config = {
    method: 'get',
    url: `${API_URL}${route}`,
    headers: { 'x-auth': token },
  };
  try {
    dispatch(loading(incidentType.loading, true));
    const result = await axios(config);
    const { data } = result.data;
    return dispatch(getIncidentsSuccess(incidentType.success, data));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(getIncidentsFailure(incidentType.failure, errorResponse));
  }
};

export default getIncidents;
