import React, {useState, useEffect} from "react";
import { createCalendar } from '../store/actions/calendarActions';
import { getCalendars,authenticateCalendar } from  '../store/actions/calendarActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const randomString = Date.now().toString(30)+''+Math.random().toString(36).replace('0.','')+''+Math.random().toString(36).replace('0.','')

function Create(props) {

const calendarList = props.calendarList;
const newURL = props.calURL;
console.log("all calendar URLs & public status...",calendarList);
console.log("newURL from nonexistent page...",newURL);

  useEffect(() => {
      props.getCalendars();
  }, []);

    const calForm={
            editKey: randomString,
            calName:null,
            calURL:(newURL===undefined ? null : newURL),
            public:false,
            description:null,
            keywords: " ",
            creationDate:null
    };

    var isMatch = "";
    const regex = /([A-Za-z0-9])/g;
    const [state,setState] = useState(calForm);
    const [match,setMatch] = useState(false);
    const [badChar,setBadChar] = useState(false);
    const [url,setURL] = useState((newURL===undefined ? "" : newURL));
  

    function handleURLChange(e) {
     
        let urlLowerCase = e.target.value.toLowerCase();
        let regexMatch = urlLowerCase.match(regex);
        isMatch = calendarList.some((calendar) => {return (calendar.calURL.toLowerCase()===urlLowerCase)});
        setMatch(isMatch);
        setURL(urlLowerCase);
        setState(Object.assign({},state,{[e.target.id]:urlLowerCase}));
        console.log("url match regex string... ", regexMatch);
        console.log("url string... ", urlLowerCase);
        if (e.target.value==="") {
          setBadChar(false);
        } else if (regexMatch===null && urlLowerCase.length>0) {
          setBadChar(true);
        } else if (urlLowerCase.length !== regexMatch.length) {
          setBadChar(true);
        } else {
          setBadChar(false);
        }
    }
   console.log("state object outside handle change...", state);
    
    function handlePublicChange(e) {

      setState(Object.assign({}, state, {
        public: !(state.public)
      }));

      console.log("state object inside handlePublicChange",state);
    }
   

    function handleChange(e){
      console.log("e.target.value...",e.target.value);
      setState(Object.assign({},state,{[e.target.id]:e.target.value}));
        console.log("state object inside handle change... ",state);
     };

     

    function handleSubmit(e) {
      e.preventDefault();
      if (match===true) {
        alert("this URL already exists, sorry!");
        return;
      } else if (state.calURL.match(regex).length!==state.calURL.length) {
        alert("no special characters in the URL suffix -- only use A-Z,a-z,0-9");
      }  else  {
      state.creationDate = new Date(Date.now()).toDateString();
    console.log("calendar being submitted by submit button...",state);
    props.createCalendar(state);
    props.authenticateCalendar(state.calURL)
      props.history.push("/calendar/"+state.calURL+((state.public) ? "" : "/private")); 
    } 
  }  


return(<div>{(newURL===undefined) ? 
    <><div className="box" id="heading">
  <h1> open calendar </h1>
</div></> : ""}

<div className="box">
<Link to="/"><p className="link">or head back to the home page...</p></Link>
  <h1>Create a new calendar</h1>
  <form onSubmit={handleSubmit}>
    <div className="row"><div className="form-group">
      <label htmlFor="calName">Calendar name...* <input required onChange={handleChange} className="form-control" type="text" id="calName"/></label>
    </div>&nbsp;&nbsp;&nbsp;
    <div className="form-group">
      <label htmlFor="calURL">{ (match===true) ? "URL suffix...*  << this url is taken >>" : "URL suffix...* "}
      <input required onChange={handleURLChange} className="form-control" type="text" id="calURL" value={url} /></label>
    </div></div>
    <p className = "formtext" > URL preview...http: //localhost:3000/calendars/{(match) ? <span className="urlTaken">THIS URL IS TAKEN</span> : url}{((url==="") ? "" : "/")}{(state.public ? "" : "private")} </p>
    <p className="formtext">{(badChar) ? <><span className="urlTaken">no special characters -- only use A-Z,a-z,0-9</span></> : ""}</p>
    <div className="form-group">
      <label htmlFor="public">Is this a public calendar? </label>&nbsp;&nbsp;&nbsp;<input onChange={handlePublicChange} type="checkbox" id="public" /> 
      <p className="formtext">public calendars are searchable from the homepage by anyone.<br/>
      private calendar URLs contain a hash, and are not findable without the link.</p>
      
    </div>
     <div className="form-group">
      <label htmlFor="description">Calendar description...* </label><textarea required onChange={handleChange} className="form-control" id="description" rows="4" cols="40" />
    </div>
    <div className="form-group">
      <label htmlFor="keywords">keywords (separated by commas)... <input onChange={handleChange} className="form-control" type="text" id="keywords" /></label>
    </div>
    <button className="btn btn-info" type="submit">create your calendar</button>
  </form>
</div>
</div>);
}


const mapStateToProps = (state) => {
  return {
    calendarInfo: state.calendarInfo.calendars,
    calendarList: state.calendarInfo.calendarList
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createCalendar: (calendar) => dispatch(createCalendar(calendar)),
    getCalendars: () => dispatch(getCalendars()),
    authenticateCalendar: (calURL) => dispatch(authenticateCalendar(calURL))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Create);
