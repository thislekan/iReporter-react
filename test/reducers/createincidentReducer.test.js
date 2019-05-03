import '@babel/polyfill';
import createIncidentReducer from '../../src/store/reducers/createIncidentReducer';
import { incidentType } from '../../src/store/actions/createIncidentAction';

describe('CreateIncident Reducer', () => {
  it('should return the initial state', () => {
    expect(createIncidentReducer({}, {})).toEqual({});
  });
  it('should return the initial state', () => {
    expect(createIncidentReducer({}, { type: incidentType.success })).toEqual({
      isLoading: false,
      message: 'Incidents successfully created',
    });
  });
  it('should return the initial state', () => {
    expect(createIncidentReducer({}, { type: incidentType.loading, status: true })).toEqual({
      isLoading: true,
      message: '',
    });
  });
  it('should return the initial state', () => {
    expect(createIncidentReducer({}, { type: incidentType.failure, message: 'failed' })).toEqual({
      isLoading: false,
      message: 'failed',
    });
  });
});
