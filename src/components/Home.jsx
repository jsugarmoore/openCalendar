import React from "react";
import { Link } from "react-router-dom";
import PublicCalendars from "./PublicCalendars";

function Home() {

  

return(<div>
    <div className="box" id="heading">
  <h1>this is open calendar</h1>
  <h4 className="calSubheader">free to use</h4>
  <h4 className="calSubheader">no sign-up</h4>
  <h4 className="calSubheader">create public or private calendars</h4>
  <h4 className="calSubheader">public calendars are searchable below</h4>
  <h2 className="homepage"><Link to="/Create"><span className="link">create a calendar</span></Link></h2>

</div>
{/* <div className="box homepageBox"> */}
  <PublicCalendars/>
  {/* <h2 className="homepage"><Link to="/PublicCalendars"><span className="link">browse public calendars...</span></Link></h2> */}
</div>);
// </div>);

}


export default Home;
