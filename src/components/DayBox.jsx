import React from "react";
import EventButton from "./EventButton";


function createEventButton(event) {
    return <EventButton key={event.editKey} editKey={event.editKey} name={event.name} venue={event.venue} startDate={event.startDate} startTime={event.startTime} endDate={event.endDate} endTime={event.endTime} description={event.description} ageRestriction={event.ageRestriction} cover={event.cover} keywords={event.keywords}/>;
}

function DayBox(props) {

   const todaysEvents = props.todaysEvents;

    const notThisMonth = { backgroundColor: '#fff591',opacity: '50%'};

  return (
    <div className="day" style={props.isThisMonth ? null : notThisMonth}>
        <div className="dayNumber">
            {props.date}
        </div>
        
        <div className="eventsContainer">
            {todaysEvents.map(createEventButton)}
        </div>
    </div>
    );
}

export default DayBox;