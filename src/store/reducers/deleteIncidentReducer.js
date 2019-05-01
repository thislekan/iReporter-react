import initialState from '../initialState';
import { incidentType } from '../actions/deleteIncidentAction';

const createdIncident = (state = initialState.incident, action) => {
  const { data, type } = action;
  switch (type) {
    case incidentType.success:
      return {
        ...data,
        isLoading: false,
        message: `The ${data.title} incident has been deleted successfully`,
      };
    case incidentType.loading:
      return {
        ...state.deletedIncident,
        isLoading: action.status,
        message: '',
      };
    case incidentType.failure:
      return {
        ...state.deletedIncident,
        isLoading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default createdIncident;
