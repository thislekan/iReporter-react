import initialState from '../initialState';
import { incidentType } from '../actions/incidentDetailAction';

const incidentDetails = (state = initialState.incident, action) => {
  const { data, type } = action;
  switch (type) {
    case incidentType.success:
      return {
        ...data,
        isLoading: false,
        message: 'Incident successfully fetched',
      };
    case incidentType.loading:
      return {
        ...state.incident,
        isLoading: action.status,
        message: '',
      };
    case incidentType.failure:
      return {
        ...state.incident,
        isLoading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default incidentDetails;
