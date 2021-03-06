import React from "react";
import "./Event.css";
import { deleteEvent, modifyEvent } from "../../../Common/Services/EventService";
import { getDateString, getPrettyDateString } from "../../../Common/Services/DateService";
import { useState } from "react";
import { Modal, Button} from 'react-bootstrap';
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import DatePicker from "react-datepicker";
import {ButtonGroup} from 'react-bootstrap';

export default function Event(props) {
  const [show, setShow] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [eventDescription, setEventDescription] = useState();
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [viewableEventDescription, setViewableEventDescription] = useState(props.description);
  const [viewableStartDate, setViewableStartDate] = useState(props.event_start);
  const [viewableEndDate, setViewableEndDate] = useState(props.event_end);
  const [viewableTitle, setViewableTitle] = useState(props.title);
  const [viewableLocation, setViewableLocation] = useState(props.location);

  function deleteEventHandler(e) {
    e.preventDefault();
    console.log(deleteEvent(props.event_id));
    setShow(true);
  }
  function modifyEventHandler(e) {
    e.preventDefault();
    setShowModifyModal(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const start_string = getDateString(startDate);
    const end_string = getDateString(endDate);
    if(!eventDescription || !location || !title) {
      handleClose();
      return;
    }

    modifyEvent(props.event_id, eventDescription, start_string, end_string, location, title).then((value) => {
      console.log(value);
    });
    setViewableEventDescription(eventDescription);
    setViewableTitle(title);
    setViewableLocation(location);
    setViewableStartDate(getPrettyDateString(startDate));
    setViewableEndDate(getPrettyDateString(endDate));
    handleClose();
  }

  const handleClose = () => setShowModifyModal(false);

  return (
    <div className={show ? 'hidden' : 'event'}>
      <Modal show={showModifyModal} onHide={handleClose}>
        <ModalHeader className="modal-header" closeButton>
          <ModalTitle>Edit Announcement</ModalTitle>
        </ModalHeader>
        <ModalBody>
        <h4>Event Title: </h4> 
          <input
            name='sample'
            type='text'
            onChange={e => setTitle(e.target.value)}
          />
        <h4>Event Location: </h4> 
          <input
            name='sample'
            type='text'
            onChange={e => setLocation(e.target.value)}
          />
        <h4>Event Description: </h4> 
          <input
            name='sample'
            type='text'
            onChange={e => setEventDescription(e.target.value)}
          />
          <h4>Start Time: </h4>
          <DatePicker 
                selected={startDate} 
                onChange={date => setStartDate(date)}
                timeInputLabel="Time:"
                showTimeInput
              />
              <h4>End Time: </h4>
              <DatePicker 
                selected={endDate} 
                onChange={date => setEndDate(date)}
                timeInputLabel="Time:"
                showTimeInput
              />
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
      {props.event_img && <img className="event-image" src={props.event_img} alt="profile"></img>}
      <div className="event-info">
        <ButtonGroup aria-label="Basic example">
          <Button variant="outline-danger" onClick={deleteEventHandler}>DELETE</Button>
          <Button variant="outline-warning" onClick={modifyEventHandler}>MODIFY</Button>
        </ButtonGroup>
        <p className="event-time">Event Start: {viewableStartDate}</p>
      </div>
      <div className="event-info">
        <p className="event-time">Event End: {viewableEndDate}</p>
      </div>
      <h4 className="event-title">{viewableTitle}</h4>
      <p className="event-location">{viewableLocation}</p>
      <p className="event-text">{viewableEventDescription}</p>
    </div>
  );
}
