import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getEvents } from "../store/actions/eventActions";
import { getPublicCalendars, authenticateCalendar } from "../store/actions/calendarActions";

var searchResults = [];

function Search(props) {

 var calURL = "";
  if (props.private) {
     calURL = props.calURL 
  } else {
   calURL = props.match.params.calURL 
  }

console.log("props in search component:",props)
const authorizedCal = props.auth;
console.log("authorized to be here?",authorizedCal);
const eventInfo = props.eventInfo.filter((event) => {return (calURL === event.calendar)});
    console.log("search page event collection...",eventInfo);

useEffect(() => {

    if (eventInfo.length===0) {
        props.getEvents(calURL);
        console.log("running initial getEvents from <SEARCH />...");
    }
 }, []); 

 useEffect(() => {

    if (props.calendarInfo.length === 0) {
        props.getPublicCalendars();     
    } 

  }, []);

 
    const thisCalendar = props.calendarInfo.filter((calendar) => { return (calendar.calURL===calURL) })[0];  
    console.log("search page calendar:",thisCalendar);

    const [state,setState] = useState("");

    function handleChange(e) {
        setState(e.target.value);
    }

searchResults = eventInfo.filter((event) => {
    return ((event.name.toLowerCase().includes(state.toLowerCase()) === true || event.venue.toLowerCase().includes(state.toLowerCase()) === true || event.description.toLowerCase().includes(state.toLowerCase()) === true || event.keywords.toLowerCase().includes(state.toLowerCase()) === true))
});

   
    function createSearchResult(event) {
        
        return(<div key={event.editKey} className="searchResult">
        <h4>{event.name} @ {event.venue}</h4>
       <p>starts on {event.startDate.toDateString()} at {event.startTime} </p>
          <p>ends on {event.endDate.toDateString()} at {event.endTime} </p>
        <p>{event.description} </p>
        <p>{event.ageRestriction==="true" ? "21+" : "all ages"}  |  {event.cover} </p>
        <p>keywords... {event.keywords}</p>
        <hr></hr>
        </div>
        );
    }

    const password = "turtles";
    const [auth, setAuth] = useState(false);


    function handleAuth(e) {
        console.log(e.target.value);
        if (e.target.value === password) {
            setAuth(true);
            props.authenticateCalendar(calURL);
            // set global authorization for this particular calendar by mapping this action to the store
        }
    }

    return(<>{(auth || (authorizedCal===calURL) || (thisCalendar===undefined ? false : thisCalendar.public)) ? <><div className="box">
    <Link to={"/calendar/"+calURL+(thisCalendar===undefined ? "" : (thisCalendar.public===true ? "" : "/private"))}><p className="link">head back to the calendar { thisCalendar === undefined ? "" : "'"+thisCalendar.calName+"'" }...</p></Link>
    <div className="searchBar">
    <input onChange={handleChange} name="searchTerms" type="text" placeholder="search..."/>


    </div>
    <div className="searchResults">
    <h3>{state.length===0 ? "all " : ""}events{state.length>0 ? " matching '"+state+"'" : null}...</h3>
        <div className="resultsBox">{searchResults.map(createSearchResult)}</div> 
    </div>
    </div></>  : 
<><div className="box"><input className="form-control" type="text" id="auth" onChange={handleAuth}/>enter the key...</div></>}</>
        );

}

const mapStateToProps = (state) => {
    return {
        eventInfo:state.eventInfo.events,
        calendarInfo:state.calendarInfo.calendars,
        auth:state.calendarInfo.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: (calURL) => dispatch(getEvents(calURL)),
        getPublicCalendars: () => dispatch(getPublicCalendars()),
        authenticateCalendar: (calURL) => dispatch(authenticateCalendar(calURL))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);