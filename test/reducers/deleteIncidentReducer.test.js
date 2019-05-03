import '@babel/polyfill';
import deleteIncidentReducer from '../../src/store/reducers/deleteIncidentReducer';
import { incidentType as type } from '../../src/store/actions/deleteIncidentAction';

describe('DeleteIncident Reducer', () => {
  it('should return the initial state', () => {
    expect(deleteIncidentReducer({}, {})).toEqual({});
  });
  it('should return the initial state', () => {
    expect(deleteIncidentReducer({}, { type: type.success, data: { title: 'joy' } })).toEqual({
      isLoading: false,
      message: 'The joy incident has been deleted successfully',
      title: 'joy',
    });
  });
  it('should return the initial state', () => {
    expect(
      deleteIncidentReducer({}, { type: type.loading, status: true }),
    ).toEqual({
      isLoading: true,
      message: '',
    });
  });
  it('should return the initial state', () => {
    expect(deleteIncidentReducer({}, { type: type.failure, message: 'failed' })).toEqual({
      isLoading: false,
      message: 'failed',
    });
  });
});
