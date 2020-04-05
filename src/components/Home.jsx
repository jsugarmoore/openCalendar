import React, {useState } from "react";
import { Link } from "react-router-dom";
import PublicCalendars from "./PublicCalendars";
import Login from "./Login";
import Register from "./Register";

function Home() {

  
function showRegister() {
  setTask("register");
}

function showLogin() {
  setTask("login");
}

const [task,setTask] = useState("login");


return(<>

<div className="loginHeader"><div className="calSubheader loginContainer">{( task==="login" ? <><div className="row"><h2>Log in</h2><span className="btn link" onClick={showRegister}>&nbsp;&nbsp;or register...</span></div><div><Login/></div></>
                    : <><div className="row"><h2>Register</h2><span className="btn link" onClick={showLogin}>&nbsp;&nbsp;or log in...</span></div><div><Register/></div></> )}
</div></div>

    <div className="box" id="heading">
  <h1>this is open calendar</h1>
  <h5 className="calSubheader">free and ad-free</h5>
  <h5 className="calSubheader">create, share, and follow calendars and events</h5>
  <h5 className="calSubheader">public calendars are searchable below</h5>
  <h2 className="homepage"><Link to="/Create"><span className="link">create a calendar</span></Link></h2>


</div>
  
  <PublicCalendars />
</>);


}


export default Home;
