import React from "react";
import CalendarHeader from "./CalendarHeader";
import Submit from "./Submit";
import Search from "./Search";
import Home from "./Home";
import Create from "./Create";
import PublicCalendars from "./PublicCalendars";
import PrivateCalendar from "./PrivateCalendar";
import SubmitPrivateCalendar from "./SubmitPrivateCalendar";
import SearchPrivateCalendar from "./SearchPrivateCalendar";
import { BrowserRouter, Route} from "react-router-dom";



function App() {

    return (<div>
      <BrowserRouter>
      <Route path="/PublicCalendars" component={PublicCalendars}/>
      <Route exact path="/calendar/:calURL/private" component={PrivateCalendar}/>
      <Route exact path="/calendar/:calURL/private/submit" component={SubmitPrivateCalendar}/>
      <Route exact path="/calendar/:calURL/private/search" component={SearchPrivateCalendar}/>
      <Route path="/Create" component={Create}/>
      <Route exact path="/calendar/:calURL" component={CalendarHeader}/>
      <Route exact path="/calendar/:calURL/submit" component={Submit}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/calendar/:calURL/search" component={Search} />
      <Route path="/calendar/update/:editKey" />
      <Route path="/calendar/delete/:editKey" />
      <Route path="/add" /> 
      </BrowserRouter>
      </div>
    );
}



export default App;