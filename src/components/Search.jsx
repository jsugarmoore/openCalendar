import React, {useState} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getEvents } from "../store/actions/eventActions";


var searchResults = [];

function Search(props) {

    if (props.eventInfo.length===0) {
        props.getEvents();
    }

    const allEvents = props.eventInfo;
    console.log("search page event collection...",allEvents);
    const [state,setState] = useState("search...");

    function handleChange(e) {
        setState(e.target.value);
    }

searchResults = allEvents.filter((event) => {
    return (event.name.toLowerCase().includes(state.toLowerCase()) === true || event.venue.toLowerCase().includes(state.toLowerCase()) === true || event.description.toLowerCase().includes(state.toLowerCase()) === true || event.keywords.toLowerCase().includes(state.toLowerCase()) === true)
});

   
    function createSearchResult(event) {
        
        return(<div key={event.editKey} className="searchResult">
        {/* <SearchResult /> */}
        <hr></hr>
        <h4>{event.name} @ {event.venue}</h4>
       <p>starts on {event.startDate.toDateString()} at {event.startTime} </p>
          <p>ends on {event.endDate.toDateString()} at {event.endTime} </p>
        <p>{event.description} </p>
        <p>{event.ageRestriction==="true" ? "21+" : "all ages"}  |  {event.cover} </p>
        <p>keywords... {event.keywords}</p>
        </div>
        );
    }

    return(
    <div className="box">
    <Link to="/"><p>head back to the calendar...</p></Link>
    <div className="searchBar">
    <input onChange={handleChange} name="searchTerms" type="text" placeholder={state}/>


    </div>
    <div className="searchResults">
    <h3>your search results...</h3>
        {searchResults.map(createSearchResult)} 
    </div>
    </div>
        );

}

const mapStateToProps = (state) => {
    return {
        eventInfo:state.eventInfo.events
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: () => dispatch(getEvents())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);