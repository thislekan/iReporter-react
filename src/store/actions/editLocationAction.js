import request from '../../utils/request';
import typeGenerator from './typeGenerator';

export const incidentType = typeGenerator('EDIT_LOCATION');

const loading = (type, status) => ({ type, status });
const editLocationSuccess = (type, data) => ({ type, data });
const editLocationFailure = (type, message) => ({ type, message });

export const editLocationAction = ({ id, type, location }) => async (dispatch) => {
  const route = `${type}/location/${id}`;
  const verb = 'patch';
  const payload = { location };

  try {
    dispatch(loading(incidentType.loading, true));
    const result = await request({ route, verb, payload });
    const { data } = result.data;
    return dispatch(editLocationSuccess(incidentType.success, data));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(editLocationFailure(incidentType.failure, errorResponse));
  }
};
