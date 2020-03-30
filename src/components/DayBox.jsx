import React from "react";
import EventButton from "./EventButton";
import { connect } from "react-redux";
import { setCurrentView } from "../store/actions/calendarActions";


function createEventButton(event) {
    return <EventButton key={event.editKey} _id={event._id} editKey={event.editKey} calendar={event.calendar} name={event.name} venue={event.venue} startDate={event.startDate} startTime={event.startTime} endDate={event.endDate} endTime={event.endTime} description={event.description} ageRestriction={event.ageRestriction} cover={event.cover} keywords={event.keywords} creationDate={event.creationDate}/>;
}

function DayBox(props) {
    function handleDayView() {
        let viewInfo = {calURL:props.calURL,month:props.month,date:props.date,year:props.year,view:"day"};
        console.log("new view info...",viewInfo);
        props.setCurrentView(viewInfo);
    }

   const todaysEvents = props.todaysEvents;
   const notThisMonth = { backgroundColor: '#fff591',opacity: '50%'};

  return (
    <div className="day" style={props.isThisMonth ? null : notThisMonth}>
        <div className="dayNumber" onClick={handleDayView}>
           
                {props.date}
            
        </div>
        
        <div className="eventsContainer">
            {todaysEvents.map(createEventButton)}
        </div>
    </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentView: (viewInfo) => dispatch(setCurrentView(viewInfo))
    }
}

export default connect(null,mapDispatchToProps)(DayBox);