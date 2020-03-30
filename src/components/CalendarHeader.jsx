import React, {useState,useEffect} from "react";
import Calendar from "./Calendar";
import CalendarDay from "./CalendarDay";
import { Link } from "react-router-dom";
import { getCalendars,authenticateCalendar } from '../store/actions/calendarActions';
import { setCurrentView } from '../store/actions/calendarActions';
import { connect } from 'react-redux';
import Authenticate from './Authenticate';
import Create from "./Create";

function CalendarHeader(props) {

  var calURL = "";
  if (props.private) {
     calURL = props.calURL 
  } else {
   calURL = props.match.params.calURL 
  }

  console.log("props inside CalendarHeader", props)

  useEffect(() => {

    props.getCalendars();
    console.log("fetching calendars list...")

  },[]);

  const currentView = props.viewInfo;
  const thisCalendar = props.calendarList.filter((calendar) => { return (calendar.calURL===calURL) })[0];  
  const authorizedCal = props.auth;
  console.log("this calendar:",thisCalendar);
  console.log("current view...",currentView);

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let now = new Date();
var month = now.getMonth();
var year = now.getFullYear();

const [date, setDate] = useState("");
const [monthYear, submitMonthYear] = useState([month,year]);
const [create, setCreate] = useState(false);

function handleChange(event) {
  setDate(event.target.value);
  }

function reloadCalendar(event) {
  let newMonthYear = [new Date(date).getMonth(), new Date(date).getFullYear()];
  console.log("reload calendar with this date", newMonthYear);
  
  let viewInfo = {
    calURL: calURL,
    month: newMonthYear[0],
    year: newMonthYear[1],
    view: "month"
  };
  props.setCurrentView(viewInfo);
  submitMonthYear([new Date(date).getMonth(), new Date(date).getFullYear()]);
  event.preventDefault();
}

function handleFuture(event) {
  
  if (currentView.view==="month") {
  if (monthYear[0]===11) {
  submitMonthYear([0, monthYear[1]+1]);
  event.preventDefault(); 
} else {
  submitMonthYear([monthYear[0]+1, monthYear[1]]);
  event.preventDefault();
} } else if (currentView.view==="day") {
  let today = new Date(currentView.year,currentView.month,currentView.date);
  let tomorrow = new Date(+today + 86400000)
  let viewInfo = {
    calURL: calURL,
    month: tomorrow.getMonth(),
    date: tomorrow.getDate(),
    year: tomorrow.getFullYear(),
    view: "day"
  };
  console.log("today is ",today);
  console.log("and tomorrow is ",tomorrow);
  props.setCurrentView(viewInfo);
  event.preventDefault();
}
}

function handlePast(event) {
  if (currentView.view === "month") {
  if (monthYear[0] === 0) {
     submitMonthYear([11, monthYear[1] - 1]);
     event.preventDefault();
   } else {
     submitMonthYear([monthYear[0] - 1, monthYear[1]]);
     event.preventDefault();
   } } else if (currentView.view==="day") {
  let today = new Date(currentView.year,currentView.month,currentView.date);
  let yesterday = new Date(+today - 86400000)
  let viewInfo = {
    calURL: calURL,
    month: yesterday.getMonth(),
    date: yesterday.getDate(),
    year: yesterday.getFullYear(),
    view: "day"
  };
  console.log("today is ",today);
  console.log("and yesterday was ",yesterday);
  props.setCurrentView(viewInfo);
  event.preventDefault();
}
}

month = monthYear[0];
year = monthYear[1];

function handleCreate() {
  setCreate(true);
}

function setCalView() {
  let viewInfo = {calURL:calURL,month:currentView.month,year:currentView.year,view:"month"};
  props.setCurrentView(viewInfo);
  submitMonthYear([viewInfo.month, viewInfo.year]);
}


    return ( <>{((authorizedCal===calURL) || (thisCalendar===undefined ? false : thisCalendar.public)) ? <><div className="container">
                <div className="box" id="heading">
                   <h1> { thisCalendar === undefined ? "" : thisCalendar.calName } </h1>
                   <h4 className="calSubheader"> { thisCalendar === undefined ? "" : thisCalendar.description } </h4>
                   <p className="timestamp">created on { thisCalendar === undefined ? "" : thisCalendar.creationDate}</p>
                   <div className="row container iconsBar"><div className="col icons"><Link to={"/calendar/"+calURL+"/"+ ((thisCalendar === undefined) ? "" : (thisCalendar.public ? "" : "private/"))+"submit"}><p className="link">add an event</p></Link></div>
                   <div className="col icons"><Link to="/"><p className="link">home</p></Link></div>
                   <div className="col icons"><Link to={"/calendar/"+calURL+"/"+ ((thisCalendar === undefined) ? "" : (thisCalendar.public ? "" : "private/"))+"search"}><p className="link">search for events</p></Link></div>
                 </div></div>

        <div className="calGroup">
          <div className="calendar-header row">
           <form onSubmit={handlePast}>
           <button type="submit" className="arrow">{(currentView.view==="day" ?  "yesterday" : months[(month+11)%12])}</button> 
           </form>
           <form onSubmit={reloadCalendar} className="monthSelector">
              <h2 className="monthYear" onClick={setCalView}>   {(currentView.view==="day") ? days[new Date(currentView.year,currentView.month,currentView.date).getDay()] + " " + months[currentView.month] + " " + currentView.date + ", " + currentView.year : months[month] + " " + year}</h2>
              <input onChange={handleChange} className="form-control" type="text" name="monthYear" placeholder="type a month and year, and press return..." />
              <button type="submit"></button>
            </form>
            <form onSubmit={handleFuture}>
            <button type="submit" className="arrow">{(currentView.view==="day" ?  "tomorrow" : months[(month+1)%12])}</button>
            </form>
          </div>
      </div>
    </div>
{((currentView.view==="day") ? <CalendarDay date={currentView.date} month={currentView.month} year={currentView.year} calURL={currentView.calURL}/> : <Calendar calURL={calURL} month={month} year={year}/>)} </> : 
<>{((thisCalendar===undefined) ? <><div className="box"><h2 className="homepage">This calendar doesn't exist yet.
<br/> Why don't you <span onClick={handleCreate} className="link">create it</span>?</h2></div></> : <Authenticate calURL={calURL}/>)}</> 
    }{( (create===true) ? <Create history={props.history} calURL={calURL}/> : "")}
        </>);   
    }  

const mapStateToProps = (state) => {
    return {
        auth:state.calendarInfo.auth,
        calendarList:state.calendarInfo.calendarList,
        viewInfo:state.calendarInfo.viewInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticateCalendar: (calURL) => dispatch(authenticateCalendar(calURL)),
        getCalendars: () => dispatch(getCalendars()),
        setCurrentView: (viewInfo) => dispatch(setCurrentView(viewInfo))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarHeader);