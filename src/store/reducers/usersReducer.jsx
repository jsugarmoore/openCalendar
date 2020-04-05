
const users = [];
const errors = [];
const initState = { users,errors }


function userInfo(state=initState, action) {
    switch(action.type) {
        case 'REGISTER_USER':
            console.log('registered user in the usersReducer...', action.user,'and state...',state);
        case 'USER_EXISTS_ERROR':
            console.log('user exists! try again',action.err)
            return {
                errors:action.err
            }

        default: return state}

}
 
export default userInfo;