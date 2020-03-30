import axios from 'axios'

export const createCalendar = (calendar) => {
    return (dispatch,getState) => {
        axios.post('http://localhost:5000/calendars/add', calendar);
      dispatch({type: "CREATE_CALENDAR", calendar})
    }
};

export const getCalendars = () => {
    return (dispatch,getState) => {
        axios.get('http://localhost:5000/calendars/all')
        .then((response) => dispatch({type:"GET_CALENDARS", payload:response.data})).catch(err => console.log(err))
    }
}

export const getPublicCalendars = () => {
    return (dispatch,getState) => {
        axios.get('http://localhost:5000/calendars/public')
        .then((response) => dispatch({type:"GET_PUBLIC_CALENDARS", payload:response.data})).catch(err => console.log(err))
    }
}


export const getPrivateCalendar = (calURL) => {
    return (dispatch,getState) => {
        axios.get('http://localhost:5000/calendars/private/'+calURL)
        .then((response) => dispatch({type:"GET_PRIVATE_CALENDAR", payload:response.data})).catch(err => console.log(err))
    }
}

export const authenticateCalendar = (calURL) => {
    return (dispatch, getState) => {
        dispatch({type:"AUTHENTICATE_CALENDAR",calURL})
    }
}

export const setCurrentView = (viewInfo) => {
    return (dispatch,getState) => {
        dispatch({type:"SET_CURRENT_VIEW",viewInfo})
    }
}