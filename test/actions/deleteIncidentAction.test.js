import '@babel/polyfill';
import * as actions from '../../src/store/actions/deleteIncidentAction';
import mockSingleReport from '../mock/incident';
import { createMockStore } from '../mock/setup';
import request from '../../src/utils/request';

const mockStore = createMockStore();
jest.mock('../../src/utils/request');
const {
  incidentType: type, deleteSuccess, deleteFailure, loading,
} = actions;

describe('Delete incident Action', () => {
  it('should create an action to show delete process is loading', () => {
    const status = true;
    const expected = {
      type: loading,
      status,
    };
    expect(actions.loading(loading, status)).toEqual(expected);
  });
  it('should create an action when incident is deleted successfully', () => {
    const data = mockSingleReport;
    const expected = {
      type: deleteSuccess,
      data,
    };
    expect(actions.deleteSuccess(deleteSuccess, data)).toEqual(expected);
  });
  it('should create an action when incident creation fails', () => {
    const message = 'The incident could not be created';
    const expected = {
      type: deleteFailure,
      message,
    };
    expect(actions.deleteFailure(deleteFailure, message)).toEqual(expected);
  });
});

describe('DeleteIncident Action creators', () => {
  it('should dispatch success message when incident is successfully deleted', () => {
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
    return store.dispatch(actions.deleteIncident()).then(() => {
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
    return store.dispatch(actions.deleteIncident()).then(() => {
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
    return store.dispatch(actions.deleteIncident()).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
});
