import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getEvents } from "../store/actions/eventActions";

var searchResults = [];

function Search(props) {

const calURL = props.match.params.calURL;
console.log("props in search component:",props)

useEffect(() => {

if (props.eventInfo.length===0) {
        props.getEvents();
    }    
    });

 
    const thisCalendar = props.calendarInfo.filter((calendar) => { return (calendar.calURL===calURL) })[0];  
    console.log("search page calendar:",thisCalendar);

    const allEvents = props.eventInfo.filter((event) => {return (calURL === event.calendar)});
    console.log("search page event collection...",allEvents);

    const [state,setState] = useState("");

    function handleChange(e) {
        setState(e.target.value);
    }

searchResults = allEvents.filter((event) => {
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

    return(
    <div className="box">
    <Link to={"/calendar/"+calURL}><p className="link">head back to the calendar { thisCalendar === undefined ? "" : "'"+thisCalendar.calName+"'" }...</p></Link>
    <div className="searchBar">
    <input onChange={handleChange} name="searchTerms" type="text" placeholder="search..."/>


    </div>
    <div className="searchResults">
    <h3>{state.length===0 ? "all " : ""}events{state.length>0 ? " matching '"+state+"'" : null}...</h3>
        <div className="resultsBox">{searchResults.map(createSearchResult)}</div> 
    </div>
    </div>
        );

}

const mapStateToProps = (state) => {
    return {
        eventInfo:state.eventInfo.events,
        calendarInfo:state.calendarInfo.calendars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: () => dispatch(getEvents())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);