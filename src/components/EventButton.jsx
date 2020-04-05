import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import { updateEvent, deleteEvent } from "../store/actions/eventActions";


function EventButton(props) {

  const initEventState = {
    _id:props._id,
    editKey:props.editKey,
    calendar:props.calendar,
    name:props.name,
    venue:props.venue,
    startDate:props.startDate.toISOString().split('T')[0],
    startTime:props.startTime,
    endDate:props.endDate.toISOString().split('T')[0],
    endTime:props.endTime,
    description:props.description,
    ageRestriction:(props.ageRestriction==='true'),
    cover:props.cover,
    keywords:props.keywords,
    creationDate:props.creationDate
  }

  const view = props.currentView.view;

  const [show, setShow] = useState(false);
  const [edit,setEdit] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const [state,setState] = useState("");
  const [eventState,setEventState] = useState(initEventState);

  const handleClose = () => {setState("");setEventState(initEventState);setEdit(false);setEditClick(false);setShow(false)};
  const handleShow = () => setShow(true);
  const handleEditClick = () => setEditClick(true);
  const handleCancelEdit = () => {setState("");setEventState(initEventState);setEdit(false);setEditClick(false)};
  const handleCancel = () => setEditClick(false);
  const handleSubmit = () => {
    state===props.editKey ? setEdit(true) : alert((state==="" ? "that" : state)+" is not the correct edit ID. sorry!") 
  }
  const handleChange = (e) => {
    setState(e.target.value);
    console.log("edit key...",state);
  }

 function handleEventEdit(e){
      console.log(e.target.value);
            if (e.target.id!=="ageRestriction") {
        setEventState(Object.assign({},eventState,{[e.target.id]:e.target.value}));
     } else { setEventState(Object.assign({},eventState,{ageRestriction:!(eventState.ageRestriction)})) }
        console.log(eventState);
    
     };

  const handleSubmitChanges = () => {

      let startDateTime = new Date(eventState.startDate + " " + eventState.startTime);
      console.log("start date and time...",startDateTime);
      let endDateTime = new Date(eventState.endDate + " " + eventState.endTime);
      console.log("end date and time...", endDateTime);
      let duration = (endDateTime-startDateTime)/(1000*60*60);
      console.log("duration...",duration)

      if (duration<=0) {
        alert("Your event ends before it starts!! fix that, yo!")
        return;
      }

      eventState.startDate = new Date(eventState.startDate.replace(/-/g, '/'));
      eventState.endDate = new Date(eventState.endDate.replace(/-/g, '/'));

    console.log("event to be updated by submit button...",eventState);
    props.updateEvent(eventState);
    handleClose(); 
  };

  const handleDelete = () => {
    if (window.confirm("are you sure you want to delete '"+props.name+"'?")) {
      props.deleteEvent(props.editKey); 
      handleClose();
    } else {
      return;
    }
  };

  return (
    <>
      <Modal scrollable="true" show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{edit===true ?  <input required id="name" onChange={handleEventEdit} value={eventState.name}/> : props.name+"..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>venue... {edit===true ?  <input required id="venue" onChange={handleEventEdit} value={eventState.venue}/> : props.venue}</p>
          <p>start... {edit===true ?  <><input required type="date" onChange={handleEventEdit} value={eventState.startDate} id="startDate"/> <input required value={eventState.startTime} onChange={handleEventEdit} type="time" id="startTime"/><br/></>
          : <>{props.startDate.toDateString()} at {props.startTime}</>}</p>
          <p>end... {edit===true ?  <><input required type="date" onChange={handleEventEdit} value={eventState.endDate} id="endDate"/> <input required value={eventState.endTime} onChange={handleEventEdit} type="time" id="endTime"/><br/></>
          : <>{props.endDate.toDateString()} at {props.endTime} </>}</p>
          <hr></hr>
          <p className="modalDescription">{edit===true ?  <>description...  <textarea required id="description" value={eventState.description} rows="4" cols="60" onChange={handleEventEdit}/></> : props.description}</p>
          <p>{edit===true ? <>21+? <input onChange={handleEventEdit} type="checkbox" id="ageRestriction" value={eventState.ageRestriction} checked={eventState.ageRestriction===true ? 1 : 0}/></> : (props.ageRestriction==='true' ? "21+ " : "all ages ")}  
           {edit===true ? <><br/>cover charge? <input required onChange={handleEventEdit} id="cover" value={eventState.cover}/></> : " | "+props.cover} </p>
          <hr></hr>
          <p>keywords... {edit===true ?  <input required onChange={handleEventEdit} id="keywords" value={eventState.keywords}/> : props.keywords }</p>
        </Modal.Body>
        <Modal.Footer>
          <p className="timestamp mr-auto">This event was created on {props.creationDate}</p>
        {/* ----------button logic ----------------- */}
        <>
        {edit===true ? 
           <><Button variant="secondary" onClick={handleDelete}>delete</Button>
            <Button variant="secondary" onClick={handleCancelEdit}>cancel without saving</Button>
            <Button variant="secondary" onClick={handleSubmitChanges}>submit changes</Button></> :
          <>{ editClick===true ? <><label><input onChange={handleChange} placeholder="enter edit id..." /></label><Button variant="secondary" onClick={handleCancel}>cancel</Button></> :
            <Button variant="secondary" onClick={handleEditClick}>edit or delete</Button>}
          {editClick===true ?
            <Button variant="secondary" onClick={handleSubmit}>
             submit edit ID
            </Button> :
            <Button variant="secondary" onClick={handleClose}>
            close
          </Button> }</>
          }</>
        {/* ----------button logic ----------------- */}

        </Modal.Footer>
      </Modal>
      

      <div className="eventButtonContainer">
        <div
          onClick={handleShow}
          id={"button-" + props._id}
          className="event-button">
          {(window.outerWidth < 600 && view==="month" ? <>&#9787;</> : 
          <>{props.name} @ {props.venue} {((view==="day") ? "... from "+props.startTime+" to "+props.endTime
          +((props.startDate.toString()!==props.endDate.toString()) ? " on "+props.endDate.toDateString() : "")
            : "")}</>
            )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        currentView:state.calendarInfo.viewInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEvent: (event) => dispatch(updateEvent(event)),
        deleteEvent: (editKey) => dispatch(deleteEvent(editKey))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventButton);