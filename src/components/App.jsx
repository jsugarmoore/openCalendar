import React from "react";
import CalendarHeader from "./CalendarHeader";
import Submit from "./Submit";
import Search from "./Search";
import Home from "./Home";
import Create from "./Create";
import PublicCalendars from "./PublicCalendars";
import { BrowserRouter, Route} from "react-router-dom";



function App() {

    return (<div>
      <BrowserRouter>
      <Route path="/PublicCalendars" component={PublicCalendars}/>
      <Route path="/Create" component={Create}/>
      <Route exact path="/calendar/:calURL" component={CalendarHeader}/>
      <Route exact path="/calendar/:calURL/submit" component={Submit}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/calendar/:calURL/search" component={Search} />
      {/* <Route path="/calendar/edit/:id" />
      <Route path="/calendar/delete/:id" />
      <Route path="/add" /> */}
      </BrowserRouter>
      </div>
    );
}



export default App;