import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux';
import { updateEvent } from "../store/actions/eventActions";


function EventButton(props) {

  var editPlaceholder = "enter edit id...";

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
    keywords:props.keywords
  }

  const [show, setShow] = useState(false);
  const [edit,setEdit] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const [state,setState] = useState("");
  const [eventState,setEventState] = useState(initEventState);

  const handleClose = () => {setState("");setEventState(initEventState);setEdit(false);setShow(false)};
  const handleShow = () => setShow(true);
  const handleEditClick = () => setEditClick(true);
  const handleCancelEdit = () => {setState("");setEventState(initEventState);setEdit(false)};
  const handleCancel = () => setEditClick(false);
  const handleSubmit = () => {
    Number(state)===props.editKey ? setEdit(true) : alert((state==="" ? "that" : state)+" is not the correct edit ID. sorry!") 
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

  const handleDelete = () => {console.log("you still need to deal with handling deleted events...")};


  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{edit===true ?  <input required id="name" onChange={handleEventEdit} value={eventState.name}/> : props.name+"..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>venue... {edit===true ?  <input required id="venue" onChange={handleEventEdit} value={eventState.venue}/> : props.venue}</p>
          <p>start... {edit===true ?  <><input required type="date" onChange={handleEventEdit} value={eventState.startDate} id="startDate"/><input required value={eventState.startTime} onChange={handleEventEdit} type="time" id="startTime"/><br/></>
          : <>{props.startDate.toDateString()} at {props.startTime}</>}</p>
          <p>end... {edit===true ?  <><input required type="date" onChange={handleEventEdit} value={eventState.endDate} id="endDate"/><input required value={eventState.endTime} onChange={handleEventEdit} type="time" id="endTime"/><br/></>
          : <>{props.endDate.toDateString()} at {props.endTime} </>}</p>
          <hr></hr>
          <p>{edit===true ?  <>description... <textarea required id="description" value={eventState.description} rows="2" cols="40" onChange={handleEventEdit}/></> : props.description}</p>
          <p>{edit===true ? <>21+? <input onChange={handleEventEdit} type="checkbox" id="ageRestriction" value={eventState.ageRestriction} checked={eventState.ageRestriction===true ? 1 : 0}/></> : (props.ageRestriction==="true" ? "21+ " : "all ages ")}  
           {edit===true ? <><br/>cover charge? <input required onChange={handleEventEdit} id="cover" value={eventState.cover}/></> : " | "+props.cover} </p>
          <hr></hr>
          <p>keywords... {edit===true ?  <input required onChange={handleEventEdit} id="keywords" value={eventState.keywords}/> : props.keywords }</p>
        </Modal.Body>
        <Modal.Footer>

        {/* ----------button logic ----------------- */}
        
        {edit===true ? 
           <><Button variant="secondary" onClick={handleDelete}>Delete</Button>
            <Button variant="secondary" onClick={handleCancelEdit}>Cancel without saving</Button>
            <Button variant="secondary" onClick={handleSubmitChanges}>Submit changes</Button></> :
          <>{ editClick===true ? <><label><input onChange={handleChange} placeholder={editPlaceholder}/></label><Button variant="secondary" onClick={handleCancel}>Cancel</Button></> :
            <Button variant="secondary" onClick={handleEditClick}>Edit or Delete</Button>}
          {editClick===true ?
            <Button variant="secondary" onClick={handleSubmit}>
             submit
            </Button> :
            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> }</>
          }
        {/* ----------button logic ----------------- */}

        </Modal.Footer>
      </Modal>
      

      <div className="eventButtonContainer">
        <button
          onClick={handleShow}
          id={"button-" + props.editKey}
          className="event-button">
          {props.name} @ {props.venue}
        </button>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEvent: (event) => dispatch(updateEvent(event))
    }
}


export default connect(null, mapDispatchToProps)(EventButton);