import request from '../../utils/request';
import typeGenerator from './typeGenerator';

export const incidentType = typeGenerator('CREATE_INCIDENT');

const loading = (type, status) => ({ type, status });
const authSuccess = (type, data) => ({ type, data });
const authFailure = (type, message) => ({ type, message });

export const createIncident = payload => async (dispatch) => {
  const route = 'incident/create';
  const verb = 'post';

  try {
    dispatch(loading(incidentType.loading, true));
    const result = await request({ route, verb, payload });
    const { data } = result.data;
    return dispatch(authSuccess(incidentType.success, data));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(authFailure(incidentType.failure, errorResponse));
  }
};
