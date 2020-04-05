import React,{useState} from "react";
import {registerUser} from '../store/actions/userActions';
import { connect } from 'react-redux';

function Register(props) {


const [state,setState] = useState(null)

function handleChange(e) {
    setState(Object.assign({},state,{[e.target.id]:e.target.value}));
}

console.log("state outside of the handleChange function...",state)

function handleSubmit(e) {
    e.preventDefault();
    if (state.password!==state.password2) {
        window.alert("your passwords don't match");
        return;
    } else {
        console.log(state);
    props.registerUser(state);
    }
}



return(
<>
    <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group">
            <label>username...&nbsp;</label><br/>
            <input required onChange={handleChange} id="username" className="form-control" type="text" name="username"/>
        </div>
        <div className="form-group">
        &nbsp;&nbsp;<label>password...&nbsp;</label><br/>
            <input required onChange={handleChange} id="password" className="form-control" type="password" name="password"/>
        </div>
        <div className="form-group">
        &nbsp;&nbsp;<label>re-enter password...&nbsp;</label><br/>
            <input required onChange={handleChange} id="password2" className="form-control" type="password" name="password2"/>
        </div>
        <div>
            <input className="btn-info" type="submit" value="register"/>
        </div>
    </form></>

    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (user) => dispatch(registerUser(user))
    }
}


export default connect(null,mapDispatchToProps)(Register)