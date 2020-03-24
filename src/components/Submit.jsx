import React, {useState,useEffect} from "react";
import { createEvent } from '../store/actions/eventActions';
import { getCalendars} from '../store/actions/calendarActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

function Submit(props) {

const calURL = props.match.params.calURL;

  useEffect(() => {
    if (props.calendarInfo.length === 0) {
      props.getCalendars();
    }
  }, [props]);



const thisCalendar = props.calendarInfo.filter((calendar) => { return (calendar.calURL===calURL) })[0];  

    const form={
            editKey: Math.floor(Math.random() * 1000000000000),
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
            keywords: " "
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
      console.log("duration...",duration)

      if (duration<=0) {
        alert("Your event ends before it starts!! fix that, yo!")
        return;
      }

      state.startDate = new Date(state.startDate.replace(/-/g, '/'));
      state.endDate = new Date(state.endDate.replace(/-/g, '/'));
      e.preventDefault();
    console.log("event to be submitted by submit button...",state);
    props.createEvent(state);
      props.history.push("/calendar/" + props.match.params.calURL);
    }
        





return(<div>
    {/* <div className="box" id="heading">
  <h1> open calendar </h1>
</div> */}

<div className="box">
  <Link to={"/calendar/"+calURL}><p className="link">or head back to the calendar...</p></Link>
  <h1>Submit an event to the calendar<br/>'{ thisCalendar === undefined ? "" : thisCalendar.calName }'!</h1>
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
      <label htmlFor="ageRestriction">21+? </label><input onChange={handleChange} className="form-control" type="checkbox" id="ageRestriction" />
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
</div>);
}


const mapStateToProps = (state) => {
  return {
    calendarInfo: state.calendarInfo.calendars
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (event) => dispatch(createEvent(event)),
    getCalendars: () => dispatch(getCalendars())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Submit);
