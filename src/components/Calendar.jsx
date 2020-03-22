import React from "react";
import DayBox from "./DayBox";
import { connect } from 'react-redux';
import { getEvents } from '../store/actions/eventActions';



function createDayBox(day) {
    return <DayBox key={day.date+"-"+day.month+"-"+day.year} date={day.date} isThisMonth={day.isThisMonth} todaysEvents={day.events}/>
}


function Calendar(props) {

 if (props.eventInfo.length===0) {
     props.getEvents();
     console.log("running initial getEvents from <APP />...");
 }

    const eventInfo = props.eventInfo;
    console.log("data going into the calendar...",eventInfo);

    var month = props.month;
    var year = props.year;

    const fullDate = new Date(year, month);
    const dayOfFirst = fullDate.getDay();
    const daysThisMonth = new Date(year, (month + 1)%12, 0).getDate();
    const daysLastMonth = new Date(year, month, 0).getDate();
    const yearOfLastMonth = new Date(year, month, 0).getFullYear();
    const yearOfNextMonth = new Date(year, month+1).getFullYear();
    const rows = Math.ceil((daysThisMonth + dayOfFirst) / 7);
    const startNum = daysLastMonth-dayOfFirst+1;

    var dateNum = [];
    var monthNum = [];
    var yearNum = []
    var isThisMonth = []

        for (var i = 0; i<dayOfFirst; i++) { 
            dateNum.push(startNum+i);
            monthNum.push((month+11)%12);
            yearNum.push(yearOfLastMonth);
            isThisMonth.push(0);
        }
        for (var j = dayOfFirst; j<7; j++) {
            dateNum.push(1+j-dayOfFirst);
            monthNum.push(month);
            yearNum.push(year);
            isThisMonth.push(1);
        }
        for (var p = 1; p < rows; p++) {
            for (var q = 0; q < 7; q++) {
                if (7 * (p) + q - dayOfFirst < daysThisMonth) {
                    dateNum.push((7 * (p) + q - dayOfFirst + 1));
                    monthNum.push(month);
                    yearNum.push(year);
                    isThisMonth.push(1);
                } else if (7 * (p) + q - dayOfFirst >= daysThisMonth) {
                    dateNum.push((7 * (p) + q - dayOfFirst + 1) % daysThisMonth);
                    monthNum.push((month+1)%12);
                    yearNum.push(yearOfNextMonth);
                    isThisMonth.push(0);
                }
            }
        }

        
        var dayInfo = [];

        for (var a=0;a<dateNum.length;a++) {
            dayInfo[a]={
                date: dateNum[a],
                month: monthNum[a],
                year: yearNum[a],
                isThisMonth: isThisMonth[a],
                events: eventInfo.filter(function (event) {
                    return (dateNum[a] === event.startDate.getDate() &&
                        monthNum[a] === event.startDate.getMonth() &&
                        yearNum[a] === event.startDate.getFullYear())
                })
            };
        }


    return (
      
<div className="calendar-container">
          <div className="calendar">
            <span className="day-name">Sun</span>
            <span className="day-name">Mon</span>
            <span className="day-name">Tue</span>
            <span className="day-name">Wed</span>
            <span className="day-name">Thu</span>
            <span className="day-name">Fri</span>
            <span className="day-name">Sat</span>

            {dayInfo.map(createDayBox)}
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

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);