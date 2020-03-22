import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";



function EventButton(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{props.name}...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>venue... {props.venue}</p>
          <p>start... {props.startDate.toDateString()} at {props.startTime} </p>
          <p>end... {props.endDate.toDateString()} at {props.endTime}</p>
          <hr></hr>
          <p>{props.description}</p>
          <p>{props.ageRestriction==="on" ? "21+" : "all ages"}  | {props.cover} </p>
          <hr></hr>
          <p>keywords... {props.keywords}</p>
          *** to edit this event, enter the event's edit key # on the submit page ***
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
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




export default EventButton;