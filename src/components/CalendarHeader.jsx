import React, {useState} from "react";
import Calendar from "./Calendar";
import { Link } from "react-router-dom";


function CalendarHeader() {

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let now = new Date();
var month = now.getMonth();
var year = now.getFullYear();

const [date, setDate] = useState("");
const [monthYear, submitMonthYear] = useState([month,year]);

function handleChange(event) {
  setDate(event.target.value);
  }

function reloadCalendar(event) {
  submitMonthYear([new Date(date).getMonth(), new Date(date).getFullYear()]);
  event.preventDefault();
}

function nextMonth(event) {
  if (monthYear[0]===11) {
  submitMonthYear([0, monthYear[1]+1]);
  event.preventDefault(); 
} else {
  submitMonthYear([monthYear[0]+1, monthYear[1]]);
  event.preventDefault();
}
}

function lastMonth(event) {
   if (monthYear[0] === 0) {
     submitMonthYear([11, monthYear[1] - 1]);
     event.preventDefault();
   } else {
     submitMonthYear([monthYear[0] - 1, monthYear[1]]);
     event.preventDefault();
   }
}

month = monthYear[0];
year = monthYear[1];

    return (<div>
              <div className="container">
                <div className="box" id="heading">
                   <h1> pdx music and arts calendar</h1>
                   <Link to="/Form"><p>submit an event!</p></Link>
                   <Link to="/Search"><p>search for events...</p></Link>
                 </div>

        <div className="calendar-container">
          <div className="calendar-header">
           <form onSubmit={nextMonth}>
           <button type="submit" className="arrow">{months[(month+1)%12]}</button> 
           </form>
           <form onSubmit={reloadCalendar} className="monthSelector">
              <h2>{months[month] + " " + year}</h2>
              <input onChange={handleChange} className="form-control" type="text" name="monthYear" placeholder="type a month and year, and press return..." />
              <button type="submit"></button>
            </form>
            <form onSubmit={lastMonth}>
            <button type="submit" className="arrow">{months[(month+11)%12]}</button>
            </form>
          </div>
      </div>
    </div>
      <Calendar month={month} year={year}/>
 
    </div>
      
    );
}


export default CalendarHeader;