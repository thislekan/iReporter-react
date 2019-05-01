import initialState from '../initialState';
import { authType } from '../actions/authActions';

/**
 *
 * @param {*} state - The initial user state
 * @param {*} action - The action payload
 * @returns {Object} - The current user state
 */
const authReducer = (state = initialState.user, action) => {
  let displaymessage = 'User successfully logged in';
  const { token, user, route } = action;
  switch (action.type) {
    case authType.success:
      if (route === 'user/create') displaymessage = 'Your signup was successful';
      return {
        ...state,
        token,
        isLoggedIn: true,
        authStatus: true,
        message: displaymessage,
        isLoading: false,
        ...user,
      };
    case authType.loading:
      return {
        ...state,
        isLoading: action.status,
        message: '',
      };
    case authType.failure:
      return {
        ...state,
        token: undefined,
        message: action.message,
        isLoading: false,
        isLoggedIn: false,
        authStatus: false,
        id: undefined,
        email: undefined,
        isAdmin: false,
        firstName: undefined,
        lasName: undefined,
        phoneNumber: undefined,
        username: undefined,
      };
    default:
      return state;
  }
};

export default authReducer;
