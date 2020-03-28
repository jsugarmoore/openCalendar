import React, { useEffect } from 'react';
import Submit from "./Submit";
import { getPrivateCalendar } from '../store/actions/calendarActions';
import { connect } from 'react-redux';

function SubmitPrivateCalendar(props) {


    const calURL = props.match.params.calURL;

useEffect(() => {

    if (props.calendarInfo.length === 0) {
        props.getPrivateCalendar(calURL);     
    } 
  }, [props]);

  console.log("props within <SubmitPrivateCalendar />",props)

    return (<div>
        <Submit private={true} calURL={calURL}/>
    </div>

    )

}

const mapStateToProps = (state) => {
    return {
        calendarInfo:state.calendarInfo.calendars,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPrivateCalendar: (calURL) => dispatch(getPrivateCalendar(calURL)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SubmitPrivateCalendar);