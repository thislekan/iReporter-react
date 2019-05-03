import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import authReducer from './authReducer';
import userIncidents from './userIncidentsReducer';
import createIncidentReducer from './createIncidentReducer';
import incidentDetails from './incidentDetailReducer';
import deleteIncidentReducer from './deleteIncidentReducer';
import editCommentReducer from './editCommentReducer';
import editLocationReducer from './editLocationReducer';
import editSatusReducer from './editStatusReducer';

const incidentReducer = reduceReducers(
  createIncidentReducer,
  incidentDetails,
  deleteIncidentReducer,
  editCommentReducer,
  editLocationReducer,
  editSatusReducer,
);

/**
 * @function combineReducers - the redux store combineReducers function
 * @exports Object - The combination of reducers across the app
 */
export default combineReducers({
  user: authReducer,
  userIncidents,
  incident: incidentReducer,
});
