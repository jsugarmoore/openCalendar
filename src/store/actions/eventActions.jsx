import axios from 'axios'

export const createEvent = (event) => {
    return (dispatch,getState) => {
        axios.post('http://localhost:5000/events/add', event);
      dispatch({type: "CREATE_EVENT", event})
    }
};

export const updateEvent = (event) => {
    return (dispatch,getState) => {
        axios.post('http://localhost:5000/events/update/'+event.editKey,event);
        dispatch({type: "UPDATE_EVENT",event})
    }
}

export const getEvents = (calURL) => {
    return (dispatch,getState) => {
        axios.get('http://localhost:5000/events/'+calURL)
        .then((response) => dispatch({type:"GET_EVENTS", payload:response.data})).catch(err => console.log(err))
    }
}

export const deleteEvent = (editKey) => {
    return (dispatch,getState) => {
        axios.delete('http://localhost:5000/events/delete/'+editKey)
        dispatch({type: "DELETE_EVENT",editKey})
    }
}
