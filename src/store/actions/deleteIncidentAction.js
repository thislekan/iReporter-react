import request from '../../utils/request';
import typeGenerator from './typeGenerator';

export const incidentType = typeGenerator('DELETE_INCIDENT');

export const loading = (type, status) => ({ type, status });
export const deleteSuccess = (type, data) => ({ type, data });
export const deleteFailure = (type, message) => ({ type, message });

export const deleteIncident = payload => async (dispatch) => {
  const route = 'incident/delete';
  const verb = 'delete';

  try {
    dispatch(loading(incidentType.loading, true));
    const result = await request({ route, verb, payload });
    const { data } = result.data;
    return dispatch(deleteSuccess(incidentType.success, data));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(deleteFailure(incidentType.failure, errorResponse));
  }
};
