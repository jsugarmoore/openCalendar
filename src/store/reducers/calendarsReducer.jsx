const calendars = [];
const initState = { calendars }


function calendarInfo(state = initState, action) {
    switch (action.type) {
        case 'CREATE_CALENDAR':
            console.log('created calendar!', action.calendar, state);
            return {
                calendars: [...state.calendars, action.calendar]
            }
            case 'GET_CALENDARS':
                console.log('calendars received into reducer...', action.payload, state);
                return {
                    calendars: [...state.calendars, ...action.payload]
                }
                default:
                    return state
    }

}

export default calendarInfo;