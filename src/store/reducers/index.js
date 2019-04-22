import { combineReducers } from 'redux';
import authReducer from './authReducer';


/**
 * @function combineReducers - the redux store combineReducers function
 * @exports Object - The combination of reducers across the app
 */
export default combineReducers({
  user: authReducer,
});
