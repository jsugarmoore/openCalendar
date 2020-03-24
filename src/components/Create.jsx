import React, {useState} from "react";
import { createCalendar } from '../store/actions/calendarActions';
import { connect } from 'react-redux';

function Create(props) {

//   if (props.calendarInfo.length === 0) {
//     props.getCalendars();
//   }

    const calForm={
            editKey: Math.floor(Math.random() * 1000000000000),
            calName:null,
            calURL:null,
            public:false,
            description:null,
            keywords: " "
    };

    const [state,setState] = useState(calForm);

    function handleChange(e){
      console.log(e.target.value);
            if (e.target.id!=="public") {
        setState(Object.assign({},state,{[e.target.id]:e.target.value}));
     } else { setState(Object.assign({},state,{public:!(state.public)})) }
        console.log(state);
    
     };

    function handleSubmit(e) {
      e.preventDefault();
    console.log("calendar to be submitted by submit button...",state);
    props.createCalendar(state);
      props.history.push("/calendar/"+state.calURL); 
    }
        


return(<div>
    <div className="box" id="heading">
  <h1> open calendar </h1>
</div>


<div className="box">
  <h1>Create a new calendar</h1>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="calName">Calendar name...* <input required onChange={handleChange} className="form-control" type="text" id="calName"/></label>
    </div>
    <div className="form-group">
      <label htmlFor="calURL">URL suffix...* <input required onChange={handleChange} className="form-control" type="text" id="calURL" /></label>
    </div>
    <div className="form-group">
      <label htmlFor="public">Is this a public calendar? </label><input onChange={handleChange} className="form-control" type="checkbox" id="public" />
    </div>
     <div className="form-group">
      <label htmlFor="description">Calendar description... </label><textarea onChange={handleChange} className="form-control" id="description" rows="4" cols="40" />
    </div>
    <div className="form-group">
      <label htmlFor="keywords">keywords (separated by commas)... <input onChange={handleChange} className="form-control" type="text" id="keywords" /></label>
    </div>
    <button className="btn btn-info" type="submit">create your calendar</button>
  </form>
</div>
</div>);
}


// const mapStateToProps = (state) => {
//   return {
//     calendarInfo: state.calendarInfo.calendars
//   }
// }


const mapDispatchToProps = (dispatch) => {
  return {
    createCalendar: (calendar) => dispatch(createCalendar(calendar))
  }
}


export default connect(null,mapDispatchToProps)(Create);
