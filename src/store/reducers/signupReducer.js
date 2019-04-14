import initialState from '../initialState';
import { signupType } from '../actions/signupActions';

/**
 *
 * @param {*} state - The initial user state
 * @param {*} action - The action payload
 * @returns {Object} - The current user state
 */
const signupReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case signupType.success:
      return {
        ...state,
        token: action.token,
        isLoggedIn: true,
        authStatus: true,
        message: 'Your signup was successful',
        isLoading: false,
        ...action.user,
      };
    case signupType.loading:
      return {
        ...state,
        isLoading: action.status,
      };
    case signupType.failure:
      return {
        ...state,
        token: undefined,
        message: action.errorResponse,
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

export default signupReducer;
