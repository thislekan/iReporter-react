import axios from 'axios';
import API_URL from '../../constant';
import typeGenerator from './typeGenerator';

export const signupType = typeGenerator('SIGN_UP_USER');

const loading = (type, status) => ({ type, status });
const signupSuccess = (type, user, token) => ({ type, user, token });
const signupFailure = (type, message) => ({ type, message });

const userSignup = payload => async (dispatch) => {
  try {
    dispatch(loading(signupType.loading, true));
    const result = await axios.post(`${API_URL}user/create`, { ...payload });
    const { token, user } = await result.data.data;
    return dispatch(signupSuccess(signupType.success, user, token));
  } catch (error) {
    const errorResponse = error.response.data.error;
    return dispatch(signupFailure(signupType.failure, errorResponse));
  }
};

export default userSignup;
