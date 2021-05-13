import React from "react";
import "./Announcement.css";
//import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteAnnouncement } from "../../../Common/Services/AnnouncementService";

export default function Announcement(props) {
  const [show, setShow] = useState(false);

  function deleteAnnouncementHandler(e) {
    e.preventDefault();
    console.log(deleteAnnouncement(props.announcement_id));
    setShow(true);
  }

  return (
    <div className={show ? 'hidden' : 'announcement'}>
      <div className="announcement-info">
      <button className="ann-delete-button" onClick={deleteAnnouncementHandler}>DELETE</button>
      </div>
      <p className="event-text">{props.announcement_text}</p>
    </div>
  );
}
