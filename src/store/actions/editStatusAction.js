import request from '../../utils/request';
import typeGenerator from './typeGenerator';

export const incidentType = typeGenerator('EDIT_COMMENT');

export const loading = (type, status) => ({ type, status });
export const editStatusSuccess = (type, data) => ({ type, data });
export const editStatusFailure = (type, message) => ({ type, message });

export const editStatusAction = ({ id, status }) => async (dispatch) => {
  const route = 'update/status';
  const verb = 'patch';
  const payload = { status, id };

  try {
    dispatch(loading(incidentType.loading, true));
    const result = await request({ route, verb, payload });
    const { data } = result.data;
    return dispatch(editStatusSuccess(incidentType.success, data));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(editStatusFailure(incidentType.failure, errorResponse));
  }
};
