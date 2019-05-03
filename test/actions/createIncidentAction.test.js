import '@babel/polyfill';
import * as actions from '../../src/store/actions/createIncidentAction';
import mockSingleReport from '../mock/incident';
import { createMockStore } from '../mock/setup';
import request from '../../src/utils/request';

const mockStore = createMockStore();
jest.mock('../../src/utils/request');
const {
  createFailure, createSuccess, loading, incidentType: type,
} = actions;

describe('Create Article Action', () => {
  it('should create an action to show creation process is loading', () => {
    const status = true;
    const expected = {
      type: loading,
      status,
    };
    expect(actions.loading(loading, status)).toEqual(expected);
  });
  it('should create an action when incident creation is successful', () => {
    const data = mockSingleReport;
    const expected = {
      type: createSuccess,
      data,
    };
    expect(actions.createSuccess(createSuccess, data)).toEqual(expected);
  });
  it('should create an action when incident creation fails', () => {
    const message = 'The incident could not be created ';
    const expected = {
      type: createFailure,
      message,
    };
    expect(actions.createFailure(createFailure, message)).toEqual(expected);
  });
});

describe('Action creators', () => {
  it('should dispatch success message when incident creation is successful', () => {
    request.mockResolvedValue({ data: { data: 'success' } });
    const expected = [
      {
        type: type.loading,
        status: true,
      },
      {
        type: type.success,
        data: 'success',
      },
    ];
    const store = mockStore();
    return store.dispatch(actions.createIncident()).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
  it('should dispatch error message when incident creation is not successful', () => {
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
    return store.dispatch(actions.createIncident()).then(() => {
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
    return store.dispatch(actions.createIncident()).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
});
