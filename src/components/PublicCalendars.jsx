import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getPublicCalendars } from "../store/actions/calendarActions";


var searchResults = [];

function PublicCalendars(props) {
    
useEffect(() => {
    if (props.calendarInfo.filter((calendar) => {return (calendar.public===true)}).length===0) {
        props.getPublicCalendars();
    }
},[]);

    const allPublicCalendars = props.calendarInfo.filter((calendar) => {return (calendar.public===true)});
    const allPublicCalendarsSorted = allPublicCalendars.sort(function (a, b) {
    return a.calName.toLowerCase().localeCompare(b.calName.toLowerCase())});
    console.log("<PublicCalendars/> collection...",allPublicCalendarsSorted);
    const [state,setState] = useState("");

    function handleChange(e) {
        setState(e.target.value);
    }

searchResults = allPublicCalendarsSorted.filter((calendar) => {
    return (calendar.calName.toLowerCase().includes(state.toLowerCase()) === true || calendar.keywords.toLowerCase().includes(state.toLowerCase()) === true || calendar.description.toLowerCase().includes(state.toLowerCase()) === true)
});

   
    function createSearchResult(calendar) {
        
        return(<div key={calendar.editKey} className="searchResult">
        <Link to={"/calendar/"+calendar.calURL}><h4 className="link">{calendar.calName}</h4></Link>
        <p>{calendar.description} </p>
        <p>keywords... {calendar.keywords}</p>
        <p className="timestamp">made on {calendar.creationDate}</p>
        <hr></hr>
        </div>
        );
    }

    return(
    <div className="box">
    {/* <Link to="/"><p className="link">head back to the home page...</p></Link> */}
    <div className="searchBar">
    <input onChange={handleChange} name="searchTerms" type="text" placeholder="search..."/>


    </div>
    <div className="searchResults">
    <h3>Public calendars {state.length>0 ? "matching '"+state+"'" : null}...</h3>
        <div className="resultsBox">{searchResults.map(createSearchResult)}</div> 
    </div>
    </div>
        );

}

const mapStateToProps = (state) => {
    return {
        calendarInfo:state.calendarInfo.calendars
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPublicCalendars: () => dispatch(getPublicCalendars())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PublicCalendars);