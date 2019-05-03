import '@babel/polyfill';
import incidentDetailReducer from '../../src/store/reducers/incidentDetailReducer';
import { incidentType } from '../../src/store/actions/incidentDetailAction';

describe('EditComment Reducer', () => {
  it('should return the initial state', () => {
    expect(incidentDetailReducer({}, {})).toEqual({});
  });
  it('should return the initial state', () => {
    const title = 'you';
    expect(incidentDetailReducer({}, { type: incidentType.success, data: { title } })).toEqual({
      isLoading: false,
      message: 'Incident successfully fetched',
      title: 'you',
    });
  });
  it('should return the initial state', () => {
    expect(incidentDetailReducer({}, { type: incidentType.loading, status: true })).toEqual({
      isLoading: true,
      message: '',
    });
  });
  it('should return the initial state', () => {
    expect(incidentDetailReducer({}, { type: incidentType.failure, message: 'failed' })).toEqual({
      isLoading: false,
      message: 'failed',
    });
  });
});
