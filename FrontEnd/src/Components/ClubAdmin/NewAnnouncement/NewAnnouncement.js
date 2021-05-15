import React from "react";
import "./NewAnnouncement.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createAnnouncement } from "../../../Common/Services/AnnouncementService";
import { getDateString } from "../../../Common/Services/DateService";
import { Button } from 'react-bootstrap';

const NewAnnouncement = (props) => {
  const [endDate, setEndDate] = useState(new Date());
  const [announcementDescription, setAnnouncementDescription] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const start_string = getDateString(new Date());
    const end_string = getDateString(endDate);
    
    createAnnouncement({
        club_id: props.clubId, 
        created_at: start_string, 
        expires_at: end_string,
        announcement_text: announcementDescription
      }).then((value) => {
        console.log(value);
        document.getElementById("announcement-form").reset();
      });
    
  }
    
  return (
    <div className="new-announcement">
        <h3>Create New Announcement</h3>
            <form id="announcement-form" onSubmit={e => {handleSubmit(e)}}>
              <h4>Announcement Description: </h4>
              <input
              name='sample'
              type='text'
              onChange={e => setAnnouncementDescription(e.target.value)}
              />
              <br />
              <h4>Expiration Time: </h4>
              <DatePicker 
                selected={endDate} 
                onChange={date => setEndDate(date)}
                timeInputLabel="Time:"
                showTimeInput
              />
              <br />
              <Button variant="outline-warning" onClick={handleSubmit}>Create Announcement</Button>
            </form>
    </div>
  );
};

export default NewAnnouncement;