import React, {useState,useEffect} from "react";
import { createEvent } from '../store/actions/eventActions';
import { getCalendars,authenticateCalendar } from '../store/actions/calendarActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Authenticate from "./Authenticate";

function Submit(props) {

 var calURL = "";
  if (props.private) {
     calURL = props.calURL 
  } else {
     calURL = props.match.params.calURL 
  }

  const authorizedCal = props.auth;

 useEffect(() => {

    props.getCalendars();
    console.log("fetching calendars list within <Submit />...")

  },[]);

const thisCalendar = props.calendarList.filter((calendar) => { return (calendar.calURL===calURL) })[0];  
console.log("props within <Submit />...",props);
console.log("this calendar is ",calURL,thisCalendar);

    const form={
            editKey: Date.now().toString(36)+''+Math.random().toString(36).replace('0.','')+''+Math.random().toString(36).replace('0.',''),
            calendar: calURL,
            name:null,
            venue:null,
            startDate:null,
            startTime:null,
            endDate: null,
            endTime: null,
            description: null,
            ageRestriction: false,
            cover: null,
            keywords: " ",
            creationDate: null
    };

    const [state,setState] = useState(form);

    function handleChange(e){
      console.log(e.target.value);
            if (e.target.id!=="ageRestriction") {
        setState(Object.assign({},state,{[e.target.id]:e.target.value}));
     } else { setState(Object.assign({},state,{ageRestriction:!(state.ageRestriction)})) }
        console.log(state);
    
     };

    function handleSubmit(e) {
      e.preventDefault();
      let startDateTime = new Date(state.startDate + " " + state.startTime);
      console.log("start date and time...",startDateTime);
      let endDateTime = new Date(state.endDate + " " + state.endTime);
      console.log("end date and time...", endDateTime);
      let duration = (endDateTime-startDateTime)/(1000*60*60);
      console.log("duration...",duration, " hours.")

      if (duration<=0) {
        alert("Your event ends before it starts!! fix that, yo!")
        return;
      }

      state.startDate = new Date(state.startDate.replace(/-/g, '/'));
      state.endDate = new Date(state.endDate.replace(/-/g, '/'));
      state.creationDate = new Date(Date.now()).toDateString();
      e.preventDefault();
      console.log("event to be submitted by submit button...",state);
      console.log("calURL: ",calURL," & props.private: ",props.private);
      props.createEvent(state);
      props.history.push("/calendar/" + calURL+ ( (props.private) ? "/private" : ""));
    }
        

return(<>{((authorizedCal===calURL) || (thisCalendar===undefined ? false : thisCalendar.public)) ? <><div>
 
<div className="box">
  <Link to={"/calendar/"+calURL+(thisCalendar===undefined ? "" : (thisCalendar.public===true ? "" : "/private"))}><p className="link">or head back to the calendar...</p></Link>
  <h1>Submit an event to the calendar<br/>'{ thisCalendar === undefined ? "" : thisCalendar.calName }'</h1>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="name">Event name...* <input required onChange={handleChange} className="form-control" type="text" id="name"/></label>
    </div>
    <div className="form-group">
      <label htmlFor="venue">Venue...* <input required onChange={handleChange} className="form-control" type="text" id="venue" /></label>
    </div>
    <div className="form-group">
      <label htmlFor="startDateTime">Start date and time...*<input required onChange={handleChange} className="form-control" type="date" id="startDate" />
        <input required onChange={handleChange} className="form-control" type="time" id="startTime" /></label>
    </div>
    <div className="form-group">
      <label htmlFor="endDateTime">End date and time...* <input required min={state.startDate} onChange={handleChange} className="form-control" type="date" id="endDate" />
        <input required onChange={handleChange} className="form-control" type="time" id="endTime" /></label>
    </div>
    <div className="form-group">
      <label htmlFor="description">Event description...* </label><textarea required onChange={handleChange} className="form-control" id="description" rows="4" cols="40"></textarea>
    </div>
    <div className="form-group">
      <label htmlFor="ageRestriction">21+? </label>&nbsp;&nbsp;&nbsp;<input onChange={handleChange} type="checkbox" id="ageRestriction" />
    </div>
    <div className="form-group">
      <label htmlFor="cover">cover charge?*  <input required onChange={handleChange} className="form-control" type="text" id="cover" /></label>
    </div>
    <div className="form-group">
      <label htmlFor="keywords">keywords (separated by commas)... <input onChange={handleChange} className="form-control" type="text" id="keywords" /></label>
    </div>
    <button className="btn btn-info" type="submit">submit your event</button>
  </form>
</div>
</div></> : 
<><Authenticate calURL={calURL} /></>}</>
);
}


const mapStateToProps = (state) => {
  return {
    calendarList: state.calendarInfo.calendarList,
    auth: state.calendarInfo.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (event) => dispatch(createEvent(event)),
    getCalendars: () => dispatch(getCalendars()),
    authenticateCalendar: (calURL) => dispatch(authenticateCalendar(calURL))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Submit);
