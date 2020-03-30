import React,{ useEffect } from "react";
import EventButton from "./EventButton";
import { connect } from 'react-redux';
import { getEvents } from '../store/actions/eventActions';


var calURL = "";

function createEventButton(event) {
   return <EventButton key={event.editKey} _id={event._id} editKey={event.editKey} calendar={event.calendar} name={event.name} venue={event.venue} startDate={event.startDate} startTime={event.startTime} endDate={event.endDate} endTime={event.endTime} description={event.description} ageRestriction={event.ageRestriction} cover={event.cover} keywords={event.keywords} creationDate={event.creationDate}/>;
}


function CalendarDay(props) {
console.log("props in <CalendarDay/>:",props)

calURL = props.calURL;

const eventInfo = props.eventInfo.filter((event) => {return (calURL === event.calendar)});
    console.log("data going into the day-view calendar...",eventInfo);

useEffect(() => {

    if (eventInfo.length===0) {
        props.getEvents(calURL);
        console.log("running initial getEvents from <CALENDAR-DAY />...");
    }
 }, []);


    var date=props.date;
    var month=props.month;
    var year=props.year;

    const fullDate=new Date(year,month,date).toDateString();
        
        const todaysEvents = eventInfo.filter(function (event) {
                    return (date === event.startDate.getDate() &&
                        month === event.startDate.getMonth() &&
                        year === event.startDate.getFullYear())
                })

    return (
      
        <div className="calendar-container calendar-day-container">
            <div className="fullDate">all events for {fullDate}...</div>

            {todaysEvents.map(createEventButton)}

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
        getEvents: (calURL) => dispatch(getEvents(calURL))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CalendarDay);