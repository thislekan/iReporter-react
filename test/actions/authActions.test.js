import '@babel/polyfill';
import * as actions from '../../src/store/actions/authActions';
// import mockSingleReport from '../mock/incident';
import { createMockStore } from '../mock/setup';
import request from '../../src/utils/request';

const mockStore = createMockStore();
jest.mock('../../src/utils/request');
const {
  authType: type,
} = actions;

describe('Authenticate users', () => {
  const token = 'hi';
  const user = {};
  it('should dispatch success user is authenticated', () => {
    request.mockResolvedValue({ data: { data: { user, token } } });
    const expected = [
      {
        type: type.loading,
        status: true,
      },
      {
        type: type.success,
        user,
        token,
        route: undefined,
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.authenticateUser({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
  it('should dispatch error authentication is unsuccessful', () => {
    request.mockRejectedValue({ response: { data: { error: 'failed' } } });
    const expected = [
      {
        type: type.loading,
        status: true,
      },
      {
        type: type.failure,
        message: 'failed',
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.authenticateUser({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
  it('should dispatch error message for unknown error', () => {
    request.mockResolvedValue({});
    const expected = [
      {
        type: type.loading,
        status: true,
      },
      {
        type: type.failure,
        message: 'Please check if your network is still connected',
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.authenticateUser({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
});
