import React, { useState } from "react";
import { authenticateCalendar } from '../store/actions/calendarActions';
import { connect } from 'react-redux';



function Authenticate(props) {

    const calURL = props.calURL;
    const password = "bloopbleep";
    const [auth, setAuth] = useState(false);

   function handleAuth(e) {
       console.log(e.target.value);
       if (e.target.value === password) {
           setAuth(true);
       } else {
           setAuth(false)
       }
    }

   function handleSubmit(e) {
       if (auth === true) {
           props.authenticateCalendar(calURL);
       } else {
           alert("you still didn't say the magic word");
           e.preventDefault();
       }
   }

  return (<div className="container"><h2 className="authTitle">open calendar....</h2><div className="box authBox"><form className="authForm" onSubmit={handleSubmit}><input className="form-control" type="password" id="auth" 
  onChange={handleAuth} /><p className="timestamp">you didn't say the magic word</p></form></div></div>);
}

const mapStateToProps = (state) => {
    return {
        auth: state.calendarInfo.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateCalendar: (calURL) => dispatch(authenticateCalendar(calURL))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);