import axios from 'axios'

export const createCalendar = (calendar) => {
    return (dispatch,getState) => {
        axios.post('http://localhost:5000/calendars/add', calendar);
      dispatch({type: "CREATE_CALENDAR", calendar})
    }
};

export const getCalendars = () => {
    return (dispatch,getState) => {
        axios.get('http://localhost:5000/calendars/')
        .then((response) => dispatch({type:"GET_CALENDARS", payload:response.data})).catch(err => console.log(err))
    }
}
