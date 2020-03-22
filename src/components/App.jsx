import React from "react";
import CalendarHeader from "./CalendarHeader";
import Form from "./Form";
import Search from "./Search";
import { BrowserRouter, Route} from "react-router-dom";



function App() {

    return (<div>
      <BrowserRouter>
      <Route path="/Form" component={Form}/>
      <Route exact path="/" component={CalendarHeader}/>
      <Route path="/Search" component={Search} />
      <Route path="/edit/:id" />
      <Route path="/delete/:id "/>
      <Route path="/add" />
      </BrowserRouter>
      </div>
    );
}



export default App;