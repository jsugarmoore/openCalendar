const calendars = [];
const auth = "";
const calendarList = [];
const now = new Date(); 
const viewInfo = {month: now.getMonth(),
            date: now.getDate(),
            year: now.getFullYear(),
            view: (window.outerWidth < 600 ? "day" : "month")};
const initState = { calendars,auth,calendarList,viewInfo }


function calendarInfo(state = initState, action) {
    switch (action.type) {
        case 'CREATE_CALENDAR':
            console.log('created calendar!', action.calendar, state);
            return {
                calendars: [...state.calendars, action.calendar],
                    auth: state.auth,
                    calendarList: [...state.calendarList, action.calendar],
                    viewInfo: state.viewInfo
            }
            case 'GET_CALENDARS':
                console.log('calendars URLs/public status -- received into reducer...', action.payload, state);
                return {
                    calendars: [...state.calendars],
                        auth: state.auth,
                    calendarList: [...action.payload],
                    viewInfo: state.viewInfo
                }
            case 'GET_PUBLIC_CALENDARS':
                console.log('public calendars received into reducer...',action.payload,state)
                
                return {
                    calendars: [...state.calendars, ...action.payload],
                        auth: state.auth,
                    calendarList: [...state.calendarList],
                    viewInfo: state.viewInfo
                 
                }
        
            case 'GET_PRIVATE_CALENDAR':
            console.log('private calendar received into reducer...', action.payload, state)
            return {
                calendars: [...state.calendars, action.payload],
                    auth: state.auth,
                    calendarList: [...state.calendarList],
                    viewInfo: state.viewInfo
            }
            case 'AUTHENTICATE_CALENDAR':
            console.log('AUTHENTICATED calendar for this session...',action.calURL,state);
            return {
                calendars:[...state.calendars],
                auth: action.calURL,
                calendarList: [...state.calendarList],
                viewInfo:state.viewInfo
            }
            case 'SET_CURRENT_VIEW':
            console.log('Changing views...',action.viewInfo,state);
            return {
                calendars:[...state.calendars],
                auth:state.auth,
                calendarList:[...state.calendarList],
                viewInfo:action.viewInfo
            }
                default:
                    return state
    }

}

export default calendarInfo;