import '@babel/polyfill';
import userIncidentsReducer from '../../src/store/reducers/userIncidentsReducer';
import { incidentType } from '../../src/store/actions/incidentsAction';

describe('UserIncidents Reducer', () => {
  const data = ['you'];
  it('should return the initial state', () => {
    expect(userIncidentsReducer({}, {})).toEqual({});
  });
  it('should return the initial state', () => {
    expect(userIncidentsReducer({}, { type: incidentType.success, data })).toEqual({
      isLoading: false,
      message: 'Incidents successfully fetched',
      incidents: data,
    });
  });
  it('should return the initial state', () => {
    expect(userIncidentsReducer(
      { incidents: data }, { type: incidentType.loading, status: true },
    )).toEqual({
      isLoading: true,
      message: '',
      incidents: data,
    });
  });
  it('should return the initial state', () => {
    expect(userIncidentsReducer({ incidents: data }, { type: incidentType.failure, message: 'failed' })).toEqual({
      isLoading: false,
      message: 'failed',
      incidents: data,
    });
  });
});
