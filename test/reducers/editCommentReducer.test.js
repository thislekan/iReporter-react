import '@babel/polyfill';
import editCommentReducer from '../../src/store/reducers/editCommentReducer';
import { incidentType } from '../../src/store/actions/editCommentAction';

describe('EditComment Reducer', () => {
  it('should return the initial state', () => {
    expect(editCommentReducer({}, {})).toEqual({});
  });
  it('should return the initial state', () => {
    const title = 'you';
    expect(editCommentReducer({}, { type: incidentType.success, data: { title } })).toEqual({
      isLoading: false,
      message: `The ${title} incident's comment has been updated successfully`,
      title: 'you',
    });
  });
  it('should return the initial state', () => {
    expect(editCommentReducer({}, { type: incidentType.loading, status: true })).toEqual({
      isLoading: true,
      message: '',
    });
  });
  it('should return the initial state', () => {
    expect(editCommentReducer({}, { type: incidentType.failure, message: 'failed' })).toEqual({
      isLoading: false,
      message: 'failed',
    });
  });
});
