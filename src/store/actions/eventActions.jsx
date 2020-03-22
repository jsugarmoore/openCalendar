import axios from 'axios'

export const createEvent = (event) => {
    return (dispatch,getState) => {
        axios.post('http://localhost:5000/events/add', event);
      dispatch({type: "CREATE_EVENT", event})
    }
};

export const getEvents = () => {
    return (dispatch,getState) => {
        axios.get('http://localhost:5000/events/')
        .then((response) => dispatch({type:"GET_EVENTS", payload:response.data})).catch(err => console.log(err))
    }
}
