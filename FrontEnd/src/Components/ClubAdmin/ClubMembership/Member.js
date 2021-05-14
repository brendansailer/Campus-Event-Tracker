import React from "react";
//import "./Announcement.css";
//import { Link } from "react-router-dom";
import { useState } from "react";
import ProfilePage from "../../ProfilePage/ProfilePage";

export default function Member(props) {
  const [show, setShow] = useState(false);

  function deleteAnnouncementHandler(e) {
    e.preventDefault();
    //console.log(deleteAnnouncement(props.announcement_id));
    setShow(true);
  }

  return (
    <div className={show ? 'hidden' : ''}>
      <p>{props.member_username}</p>
      <button className="ann-delete-button" onClick={deleteAnnouncementHandler}>DELETE</button>
    </div>
  );
}
