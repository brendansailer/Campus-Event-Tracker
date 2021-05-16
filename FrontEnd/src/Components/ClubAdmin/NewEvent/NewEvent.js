import React from "react";
import "./NewEvent.css";
//import { getDBUser } from "../../../Common/Services/UserService";
//import { getCurrentUser } from "../../../Common/Services/AuthService";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEvent } from "../../../Common/Services/EventService";
import { getDateString } from "../../../Common/Services/DateService";
import { Button } from 'react-bootstrap';

const NewEvent = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState();
  const [eventTitle, setEventTitle] = useState();
  const [eventLocation, setEventLocation] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const start_string = getDateString(startDate);
    const end_string = getDateString(endDate);
    
    createEvent({
        club_id: props.clubId, 
        event_start: start_string, 
        event_end: end_string,
        event_description: eventDescription,
        title: eventTitle,
        location: eventLocation
      }).then((value) => {
        console.log(value);
        document.getElementById("event-form").reset();
      });
    
  }
    
  return (
    <div className="new-event">
        <h3>Create New Event</h3>
            <form id="event-form" onSubmit={e => {handleSubmit(e)}}>
              <h4>Event Title: </h4>
              <input
              name='sample'
              type='text'
              onChange={e => setEventTitle(e.target.value)}
              />
              <h4>Event Description: </h4>
              <input
              name='sample'
              type='text'
              onChange={e => setEventDescription(e.target.value)}
              />
              <h4>Event Location: </h4>
              <input
              name='sample'
              type='text'
              onChange={e => setEventLocation(e.target.value)}
              />
              <br />
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
              <br />
              <Button variant="outline-warning" onClick={handleSubmit}>Create Event</Button>
            </form>
    </div>
  );
};

export default NewEvent;