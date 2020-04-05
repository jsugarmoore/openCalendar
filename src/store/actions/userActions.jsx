import axios from 'axios';

export const registerUser = (user) => {
    return (dispatch,getState) => {
        axios.post('http://localhost:5000/users/register',user);
        dispatch({type: "REGISTER_USER", user})
    }
}

export const checkAuth = (user,resource) => {
    return (dispatch,getState) => {
        axios.get('http://localhost:5000/users/checkAuth',user,resource)
        .then(response => console.log("check auth process...",response,user,resource))
        .catch(err => console.log(err))
    }
}

export const userExistsError = (err) => {
    return (dispatch,getState) => {
        dispatch({type:"USER_EXISTS_ERROR",err})
    }
}