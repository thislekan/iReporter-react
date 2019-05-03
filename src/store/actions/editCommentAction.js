import request from '../../utils/request';
import typeGenerator from './typeGenerator';

export const incidentType = typeGenerator('EDIT_COMMENT');

export const loading = (type, status) => ({ type, status });
export const editCommentSuccess = (type, data) => ({ type, data });
export const editCommentFailure = (type, message) => ({ type, message });

export const editCommentAction = ({ id, type, comment }) => async (dispatch) => {
  const route = `${type}/comment/${id}`;
  const verb = 'patch';
  const payload = { comment };

  try {
    dispatch(loading(incidentType.loading, true));
    const result = await request({ route, verb, payload });
    const { data } = result.data;
    return dispatch(editCommentSuccess(incidentType.success, data));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(editCommentFailure(incidentType.failure, errorResponse));
  }
};
