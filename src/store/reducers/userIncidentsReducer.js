import initialState from '../initialState';
import { incidentType } from '../actions/incidentsAction';

const userIncidents = (state = initialState.userIncidents, action) => {
  const { data } = action;
  switch (action.type) {
    case incidentType.success:
      return {
        incidents: [...data.reverse()],
        isLoading: false,
        message: 'Incidents successfully fetched',
      };
    case incidentType.loading:
      return {
        incidents: [...state.incidents],
        isLoading: action.status,
        message: '',
      };
    case incidentType.failure:
      return {
        incidents: [...state.incidents],
        isLoading: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default userIncidents;
