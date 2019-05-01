import initialState from '../initialState';
import { incidentType } from '../actions/createIncidentAction';

const createdIncident = (state = initialState.incident, action) => {
  const { data, type } = action;
  switch (type) {
    case incidentType.success:
      return {
        ...data,
        isLoading: false,
        message: 'Incidents successfully created',
      };
    case incidentType.loading:
      return {
        ...state.createdIncident,
        isLoading: action.status,
        message: '',
      };
    case incidentType.failure:
      return {
        ...state.createdIncident,
        isLoading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default createdIncident;
