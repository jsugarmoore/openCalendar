import React, {useState,useEffect} from "react";
import Calendar from "./Calendar";
import { Link } from "react-router-dom";
import { getPublicCalendars,authenticateCalendar } from '../store/actions/calendarActions';
import { connect } from 'react-redux';

function CalendarHeader(props) {

  var calURL = "";
  if (props.private) {
     calURL = props.calURL 
  } else {
   calURL = props.match.params.calURL 
  }


console.log("props inside CalendarHeader", props)
  useEffect(() => {

    if (props.calendarInfo.length === 0) {
        props.getPublicCalendars();     
    } 

  }, [props]);


  const thisCalendar = props.calendarInfo.filter((calendar) => { return (calendar.calURL===calURL) })[0];  
  const authorizedCal = props.auth;
  console.log("this calendar:",thisCalendar);


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let now = new Date();
var month = now.getMonth();
var year = now.getFullYear();

const [date, setDate] = useState("");
const [monthYear, submitMonthYear] = useState([month,year]);

function handleChange(event) {
  setDate(event.target.value);
  }

function reloadCalendar(event) {
  console.log("reload calendar with this date", [new Date(date).getMonth(), new Date(date).getFullYear()]);
  submitMonthYear([new Date(date).getMonth(), new Date(date).getFullYear()]);
  event.preventDefault();
}

function nextMonth(event) {
  if (monthYear[0]===11) {
  submitMonthYear([0, monthYear[1]+1]);
  event.preventDefault(); 
} else {
  submitMonthYear([monthYear[0]+1, monthYear[1]]);
  event.preventDefault();
}
}

function lastMonth(event) {
   if (monthYear[0] === 0) {
     submitMonthYear([11, monthYear[1] - 1]);
     event.preventDefault();
   } else {
     submitMonthYear([monthYear[0] - 1, monthYear[1]]);
     event.preventDefault();
   }
}

month = monthYear[0];
year = monthYear[1];


const password = "turtles";
const [auth,setAuth] = useState(false);


function handleAuth(e) {
  console.log(e.target.value);
  if (e.target.value===password) {
    props.authenticateCalendar(calURL);
    setAuth(true);
    // set global authorization for this particular calendar by mapping this action to the store
  }
}



    return ( <>{(auth || (authorizedCal===calURL) || (thisCalendar===undefined ? false : thisCalendar.public)) ? <><div className="container">
                <div className="box" id="heading">
                   <h1> { thisCalendar === undefined ? "" : thisCalendar.calName } </h1>
                   <h4 className="calSubheader"> { thisCalendar === undefined ? "" : thisCalendar.description } </h4>
                   <p className="timestamp">created on { thisCalendar === undefined ? "" : thisCalendar.creationDate}</p>
                   <div className="row container iconsBar"><div className="col icons"><Link to={"/calendar/"+calURL+"/"+ ((thisCalendar === undefined) ? "" : (thisCalendar.public ? "" : "private/"))+"submit"}><p className="link">add an event</p></Link></div>
                   <div className="col icons"><Link to="/"><p className="link">home</p></Link></div>
                   <div className="col icons"><Link to={"/calendar/"+calURL+"/"+ ((thisCalendar === undefined) ? "" : (thisCalendar.public ? "" : "private/"))+"search"}><p className="link">search for events</p></Link></div>
                 </div></div>

        <div className="calendar-container">
          <div className="calendar-header">
           <form onSubmit={nextMonth}>
           <button type="submit" className="arrow">{months[(month+1)%12]}</button> 
           </form>
           <form onSubmit={reloadCalendar} className="monthSelector">
              <h2>{months[month] + " " + year}</h2>
              <input onChange={handleChange} className="form-control" type="text" name="monthYear" placeholder="type a month and year, and press return..." />
              <button type="submit"></button>
            </form>
            <form onSubmit={lastMonth}>
            <button type="submit" className="arrow">{months[(month+11)%12]}</button>
            </form>
          </div>
      </div>
    </div>
<Calendar calURL={calURL} month={month} year={year}/> </> : 
<><div className="box"><input className="form-control" type="text" id="auth" onChange={handleAuth}/>enter the key...</div></> 
      }
        </>);   
        
      }


const mapStateToProps = (state) => {
    return {
        calendarInfo:state.calendarInfo.calendars,
        auth:state.calendarInfo.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPublicCalendars: () => dispatch(getPublicCalendars()),
        authenticateCalendar: (calURL) => dispatch(authenticateCalendar(calURL))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarHeader);