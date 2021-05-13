import React from "react";
import "./Announcement.css";
//import { Link } from "react-router-dom";
import { deleteAnnouncement } from "../../../Common/Services/AnnouncementService";

export default function Announcement(props) {

  function deleteAnnouncementHandler(e) {
    e.preventDefault();
    console.log(deleteAnnouncement(props.announcement_id));
  }

  return (
    <div className="announcement">
      <div className="announcement-info">
      <button className="ann-delete-button" onClick={deleteAnnouncementHandler}>DELETE</button>
      </div>
      <p className="event-text">{props.announcement_text}</p>
    </div>
  );
}
