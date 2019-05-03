import '@babel/polyfill';
import * as actions from '../../src/store/actions/editCommentAction';
import mockSingleReport from '../mock/incident';
import { createMockStore } from '../mock/setup';
import request from '../../src/utils/request';

const mockStore = createMockStore();
jest.mock('../../src/utils/request');
const {
  incidentType: type, editCommentFailure, loading, editCommentSuccess,
} = actions;

describe('Edit incident comment Action', () => {
  it('should create an action to show delete process is loading', () => {
    const status = true;
    const expected = {
      type: loading,
      status,
    };
    expect(actions.loading(loading, status)).toEqual(expected);
  });
  it('should create an action when incident is edited successfully', () => {
    const data = mockSingleReport;
    const expected = {
      type: editCommentSuccess,
      data,
    };
    expect(actions.editCommentSuccess(editCommentSuccess, data)).toEqual(expected);
  });
  it('should create an action when incident edit fails', () => {
    const message = 'The incident could not be created';
    const expected = {
      type: editCommentFailure,
      message,
    };
    expect(actions.editCommentFailure(editCommentFailure, message)).toEqual(expected);
  });
});

describe('Edit Incident Comment Action creators', () => {
  it('should dispatch success message when incident comment is successfully edited', () => {
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
    return store.dispatch(actions.editCommentAction({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
  it('should dispatch error message when edit comment is not successful', () => {
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
    return store.dispatch(actions.editCommentAction({})).then(() => {
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
    return store.dispatch(actions.editCommentAction({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });
  });
});
