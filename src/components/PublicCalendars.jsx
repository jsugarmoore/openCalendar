import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCalendars } from "../store/actions/calendarActions";


var searchResults = [];

function PublicCalendars(props) {
    
useEffect(() => {
    if (props.calendarInfo.length===0) {
        props.getCalendars();
    }
});

    const allCalendars = props.calendarInfo;
    console.log("<PublicCalendars/> collection...",allCalendars);
    const [state,setState] = useState("");

    function handleChange(e) {
        setState(e.target.value);
    }

searchResults = allCalendars.filter((calendar) => {
    return (calendar.calName.toLowerCase().includes(state.toLowerCase()) === true || calendar.keywords.toLowerCase().includes(state.toLowerCase()) === true || calendar.description.toLowerCase().includes(state.toLowerCase()) === true)
});

   
    function createSearchResult(calendar) {
        
        return(<div key={calendar.editKey} className="searchResult">
        <Link to={"/calendar/"+calendar.calURL}><h4 className="link">{calendar.calName}</h4></Link>
        <p>{calendar.description} </p>
        <p>keywords... {calendar.keywords}</p>
        <hr></hr>
        </div>
        );
    }

    return(
    <div className="box">
    <Link to="/"><p className="link">head back to the home page...</p></Link>
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
        getCalendars: () => dispatch(getCalendars())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PublicCalendars);