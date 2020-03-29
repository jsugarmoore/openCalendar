const calendars = [];
const auth = "";
const calendarList = [];
const initState = { calendars,auth,calendarList }


function calendarInfo(state = initState, action) {
    switch (action.type) {
        case 'CREATE_CALENDAR':
            console.log('created calendar!', action.calendar, state);
            return {
                calendars: [...state.calendars, action.calendar],
                    auth: state.auth,
                    calendarList: [...state.calendarList]
            }
            case 'GET_CALENDARS':
                console.log('calendars URLs/public status -- received into reducer...', action.payload, state);
                return {
                    calendars: [...state.calendars],
                        auth: state.auth,
                    calendarList: [...action.payload]
                }
            case 'GET_PUBLIC_CALENDARS':
                console.log('public calendars received into reducer...',action.payload,state)
                
                return {
                    calendars: [...state.calendars, ...action.payload],
                        auth: state.auth,
                    calendarList: [...state.calendarList]
                 
                }
        
            case 'GET_PRIVATE_CALENDAR':
            console.log('private calendar received into reducer...', action.payload, state)
            return {
                calendars: [...state.calendars, action.payload],
                    auth: state.auth,
                    calendarList: [...state.calendarList]
            }
            case 'AUTHENTICATE_CALENDAR':
            console.log('AUTHENTICATED calendar for this session...',action.calURL,state);
            return {
                calendars:[...state.calendars],
                auth: action.calURL,
                calendarList: [...state.calendarList]
            }
                default:
                    return state
    }

}

export default calendarInfo;