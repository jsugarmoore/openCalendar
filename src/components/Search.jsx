import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getEvents } from "../store/actions/eventActions";
import { getCalendars, authenticateCalendar } from "../store/actions/calendarActions";
import Authenticate from './Authenticate';
import Create from "./Create";

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
const eventInfo = props.eventInfo.filter((event) => {return (calURL === event.calendar)});
    console.log("search page event collection...",eventInfo);

useEffect(() => {

    if (eventInfo.length===0) {
        props.getEvents(calURL);
        console.log("running initial getEvents from <SEARCH />...");
    }
 }, []); 

useEffect(() => {

    props.getCalendars();
    console.log("fetching calendars list within <Search />...")

  },[]);

 
    const thisCalendar = props.calendarList.filter((calendar) => { return (calendar.calURL===calURL) })[0];  
    console.log("search page calendar:",thisCalendar);

    const [state,setState] = useState("");
     const [create,setCreate] = useState(false);

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
        <p className="timestamp">created on {event.creationDate}</p>
        <hr></hr>
        </div>
        );
    }

    function handleCreate() {
      setCreate(true);
    }

    return(<>{((authorizedCal===calURL) || (thisCalendar===undefined ? false : thisCalendar.public)) ? <><div className="box">
    <Link to={"/calendar/"+calURL+(thisCalendar===undefined ? "" : (thisCalendar.public===true ? "" : "/private"))}><p className="link">head back to the calendar { thisCalendar === undefined ? "" : "'"+thisCalendar.calName+"'" }...</p></Link>
    <div className="searchBar">
    <input onChange={handleChange} name="searchTerms" type="text" placeholder="search..."/>


    </div>
    <div className="searchResults">
    <h3>{state.length===0 ? "all " : ""}events{state.length>0 ? " matching '"+state+"'" : null}...</h3>
        <div className="resultsBox">{searchResults.map(createSearchResult)}</div> 
    </div>
    </div></> : 
<>{((thisCalendar===undefined) ? <><div className="box"><h2 className="homepage">This calendar doesn't exist yet.
<br/> Why don't you <span onClick={handleCreate} className="link">create it</span>?</h2></div></> : <Authenticate calURL={calURL}/>)}</>
}{( (create===true) ? <Create history={props.history} calURL={calURL}/> : "")}
</>);
}

const mapStateToProps = (state) => {
    return {
        eventInfo:state.eventInfo.events,
        calendarList:state.calendarInfo.calendarList,
        auth:state.calendarInfo.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: (calURL) => dispatch(getEvents(calURL)),
        getCalendars: () => dispatch(getCalendars()),
        authenticateCalendar: (calURL) => dispatch(authenticateCalendar(calURL))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);