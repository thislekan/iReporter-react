import '@babel/polyfill';
import editStatusReducer from '../../src/store/reducers/editStatusReducer';
import { incidentType } from '../../src/store/actions/editStatusAction';

describe('EditStatus Reducer', () => {
  it('should return the initial state', () => {
    expect(editStatusReducer({}, {})).toEqual({});
  });
  it('should return the initial state', () => {
    const title = 'you';
    expect(editStatusReducer({}, { type: incidentType.success, data: { title } })).toEqual({
      isLoading: false,
      message: `The ${title} incident's status has been updated successfully`,
      title: 'you',
    });
  });
  it('should return the initial state', () => {
    expect(editStatusReducer({}, { type: incidentType.loading, status: true })).toEqual({
      isLoading: true,
      message: '',
    });
  });
  it('should return the initial state', () => {
    expect(editStatusReducer({}, { type: incidentType.failure, message: 'failed' })).toEqual({
      isLoading: false,
      message: 'failed',
    });
  });
});
