import React from "react";
import EventButton from "./EventButton";


function createEventButton(event) {
    return <EventButton key={event.editKey} _id={event._id} editKey={event.editKey} calendar={event.calendar} name={event.name} venue={event.venue} startDate={event.startDate} startTime={event.startTime} endDate={event.endDate} endTime={event.endTime} description={event.description} ageRestriction={event.ageRestriction} cover={event.cover} keywords={event.keywords} creationDate={event.creationDate}/>;
}

function DayBox(props) {

    function handleClick() {
        console.log("[month,date,year]...", [props.month,props.date,props.year]);
    }

   const todaysEvents = props.todaysEvents;

    const notThisMonth = { backgroundColor: '#fff591',opacity: '50%'};

  return (
    <div className="day" style={props.isThisMonth ? null : notThisMonth}>
        <div className="dayNumber" onClick={handleClick}>
            {props.date}
        </div>
        
        <div className="eventsContainer">
            {todaysEvents.map(createEventButton)}
        </div>
    </div>
    );
}

export default DayBox;