import request from '../../utils/request';
import typeGenerator from './typeGenerator';

export const incidentType = typeGenerator('INCIDENT_DETAILS');

export const loading = (type, status) => ({ type, status });
export const detailsSuccess = (type, data) => ({ type, data });
export const detailsFailure = (type, message) => ({ type, message });

export const getIncidentDetails = payload => async (dispatch) => {
  const route = `incident/${payload}`;

  try {
    dispatch(loading(incidentType.loading, true));
    const result = await request({ route });
    const { data } = result.data;
    return dispatch(detailsSuccess(incidentType.success, data));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(detailsFailure(incidentType.failure, errorResponse));
  }
};
