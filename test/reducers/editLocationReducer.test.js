import '@babel/polyfill';
import editLocationReducer from '../../src/store/reducers/editLocationReducer';
import { incidentType } from '../../src/store/actions/editLocationAction';

describe('EditLocation Reducer', () => {
  it('should return the initial state', () => {
    expect(editLocationReducer({}, {})).toEqual({});
  });
  it('should return the initial state', () => {
    const title = 'you';
    expect(editLocationReducer({}, { type: incidentType.success, data: { title } })).toEqual({
      isLoading: false,
      message: `The ${title} incident's location has been updated successfully`,
      title: 'you',
    });
  });
  it('should return the initial state', () => {
    expect(editLocationReducer({}, { type: incidentType.loading, status: true })).toEqual({
      isLoading: true,
      message: '',
    });
  });
  it('should return the initial state', () => {
    expect(editLocationReducer({}, { type: incidentType.failure, message: 'failed' })).toEqual({
      isLoading: false,
      message: 'failed',
    });
  });
});
