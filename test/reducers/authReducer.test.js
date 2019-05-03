import '@babel/polyfill';
import authReducer from '../../src/store/reducers/authReducer';
import { authType } from '../../src/store/actions/authActions';
import initialState from '../../src/store/initialState';

describe('CreateIncident Reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer({}, {})).toEqual({});
  });
  it('should return the initial state', () => {
    expect(authReducer({}, { type: authType.success })).toEqual({
      isLoading: false,
      message: 'User successfully logged in',
      isLoggedIn: true,
      authStatus: true,
      token: undefined,
    });
  });
  it('should return the initial state', () => {
    const route = 'user/create';
    expect(authReducer({}, { type: authType.success, route })).toEqual({
      isLoading: false,
      message: 'Your signup was successful',
      isLoggedIn: true,
      authStatus: true,
      token: undefined,
    });
  });
  it('should return the initial state', () => {
    expect(authReducer({}, { type: authType.loading, status: true })).toEqual({
      isLoading: true,
      message: '',
    });
  });
  it('should return the initial state', () => {
    expect(authReducer({}, { type: authType.failure, message: 'failed' })).toEqual({
      isLoading: false,
      ...initialState.user,
      message: 'failed',
    });
  });
});
