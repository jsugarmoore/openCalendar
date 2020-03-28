import React, { useEffect } from 'react';
import CalendarHeader from "./CalendarHeader";
import { getPrivateCalendar } from '../store/actions/calendarActions';
import { connect } from 'react-redux';

function PrivateCalendar(props) {


    const calURL = props.match.params.calURL;

useEffect(() => {

    if (props.calendarInfo.length === 0) {
        props.getPrivateCalendar(calURL);     
    } 
  }, [props]);

  console.log("props within <PrivateCalendar />",props)

    return (<div>
        <CalendarHeader private={true} calURL={calURL}/>
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


export default connect(mapStateToProps,mapDispatchToProps)(PrivateCalendar);