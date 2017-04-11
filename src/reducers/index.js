import { combineReducers } from 'redux';
import app from './app';
import navigation from './navigation';
import purchases from './purchases';

export default combineReducers({
    app,
    navigation,
    purchases,
});
