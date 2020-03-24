import { combineReducers } from 'redux';
import eventInfo from '../store/reducers/eventsReducer';
import calendarInfo from '../store/reducers/calendarsReducer';

export default combineReducers({
    eventInfo,
    calendarInfo
})