import axios from 'axios';
import API_URL from '../../constant';
import typeGenerator from './typeGenerator';

export const authType = typeGenerator('AUTH_USER');

const loading = (type, status) => ({ type, status });
const authSuccess = (type, user, token, route) => ({
  type, user, token, route,
});
const authFailure = (type, message) => ({ type, message });

const authenticateUser = ({ payload, route }) => async (dispatch) => {
  try {
    dispatch(loading(authType.loading, true));
    const result = await axios.post(`${API_URL}${route}`, { ...payload });
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

export default authenticateUser;
