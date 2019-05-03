import '@babel/polyfill';
import * as actions from '../../src/store/actions/incidentDetailAction';
import mockSingleReport from '../mock/incident';
import { createMockStore } from '../mock/setup';
import request from '../../src/utils/request';

const mockStore = createMockStore();
jest.mock('../../src/utils/request');
const {
  incidentType: type, loading, detailsFailure, detailsSuccess,
} = actions;

describe('Get all incidents aretion', () => {
  it('should create an action to show delete process is loading', () => {
    const status = true;
    const expected = {
      type: loading,
      status,
    };
    expect(actions.loading(loading, status)).toEqual(expected);
  });
  it('should create an action when incidents are fetched successfully', () => {
    const data = mockSingleReport;
    const expected = {
      type: detailsSuccess,
      data,
    };
    expect(actions.detailsSuccess(detailsSuccess, data)).toEqual(expected);
  });
  it('should create an action when incident fetching fails', () => {
    const message = 'The incidents could not be fetched';
    const expected = {
      type: detailsFailure,
      message,
    };
    expect(actions.detailsFailure(detailsFailure, message)).toEqual(expected);
  });
});

describe('Get all Incidents Action creators', () => {
  it('should dispatch success message when incidents are successfully fetched', () => {
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
    return store.dispatch(actions.getIncidentDetails({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
  it('should dispatch error message when fetching status is not successful', () => {
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
    return store.dispatch(actions.getIncidentDetails({})).then(() => {
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
    return store.dispatch(actions.getIncidentDetails({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
});
