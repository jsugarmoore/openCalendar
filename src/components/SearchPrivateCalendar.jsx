import React, { useEffect } from 'react';
import Search from "./Search";
import { getPrivateCalendar } from '../store/actions/calendarActions';
import { connect } from 'react-redux';

function SubmitPrivateCalendar(props) {


    const calURL = props.match.params.calURL;

useEffect(() => {

    if (props.auth && props.calendarInfo.filter((calendar) => {return (calendar.public===false)}).length === 0) {
        props.getPrivateCalendar(calURL);     
    } 
  }, [props]);

  console.log("props within <SearchPrivateCalendar />",props)

    return (<div>
        <Search private={true} calURL={calURL}/>
    </div>

    )

}

const mapStateToProps = (state) => {
    return {
        calendarInfo:state.calendarInfo.calendars,
        auth:state.calendarInfo.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPrivateCalendar: (calURL) => dispatch(getPrivateCalendar(calURL)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SubmitPrivateCalendar);