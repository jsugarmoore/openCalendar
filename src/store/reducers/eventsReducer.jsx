
const events = [];
const initState = { events }


function eventInfo(state=initState, action) {
    switch(action.type) {
        case 'CREATE_EVENT':
            console.log('created event!', action.event,state);
            action.event.ageRestriction = action.event.ageRestriction.toString();
            return {
                events:[...state.events,action.event]
            }
        case 'GET_EVENTS':
            console.log('events received into reducer...', action.payload,state);
            action.payload.forEach(event => (event.startDate = new Date(event.startDate)));
            action.payload.forEach(event => (event.endDate = new Date(event.endDate)));
            return {
                events: [...state.events, ...action.payload]
            }
        case 'UPDATE_EVENT':
            console.log('updated event!',action.event,state);
            const stateMinusOldEvent = state.events.filter((event) => {return (event._id !== action.event._id)});
            action.event.ageRestriction = action.event.ageRestriction.toString();
            return {
                events:[...stateMinusOldEvent,action.event]
            }
        case 'DELETE_EVENT':
            console.log('deleted event!',action.editKey,state);
            const stateMinusDeletedEvent = state.events.filter((event) => {return (event.editKey !== action.editKey)});
            return {
                events: [...stateMinusDeletedEvent]
            }

        default: return state}

}
 
export default eventInfo;