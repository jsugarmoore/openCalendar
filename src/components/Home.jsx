import React from "react";
import { Link } from "react-router-dom";

function Home() {

  

return(<div>
    <div className="box" id="heading">
  <h1> welcome to open calendar!</h1>
</div>


<div className="box homepageBox">
  <h2 className="homepage"><Link to="/Create"><span className="link">create a calendar</span></Link></h2>
  <h2 className="homepage"><Link to="/PublicCalendars"><span className="link">browse public calendars...</span></Link></h2>
</div>
</div>);

}


export default Home;
