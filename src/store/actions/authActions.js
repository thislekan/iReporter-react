import request from '../../utils/request';
import typeGenerator from './typeGenerator';

export const authType = typeGenerator('AUTH_USER');

export const loading = (type, status) => ({ type, status });
export const authSuccess = (type, user, token, route) => ({
  type, user, token, route,
});
export const authFailure = (type, message) => ({ type, message });

export const authenticateUser = ({ payload, route }) => async (dispatch) => {
  const verb = 'post';
  try {
    dispatch(loading(authType.loading, true));
    const result = await request({ route, verb, payload });
    const { token, user } = await result.data.data;
    return dispatch(authSuccess(authType.success, user, token, route));
  } catch (error) {
    let errorResponse = 'Please check if your network is still connected';
    if (error.response) {
      errorResponse = error.response.data.error;
    }
    return dispatch(authFailure(authType.failure, errorResponse));
  }
};
