import { combineReducers } from 'redux';
import signupReducer from './signupReducer';


/**
 * @function combineReducers - the redux store combineReducers function
 * @exports Object - The combination of reducers across the app
 */
export default combineReducers({
  user: signupReducer,
});
