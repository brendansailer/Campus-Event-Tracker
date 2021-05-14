import React from "react";
//import "./Announcement.css";
//import { Link } from "react-router-dom";
import "./Member.css";
import { useState } from "react";
import ProfilePage from "../../ProfilePage/ProfilePage";
import {ButtonGroup, Button } from 'react-bootstrap';

export default function Member(props) {
  const [show, setShow] = useState(false);

  function deleteAnnouncementHandler(e) {
    e.preventDefault();
    //console.log(deleteAnnouncement(props.announcement_id));
    setShow(true);
  }

  function isAdmin() {
      return true;
  }

  function RelevantButton() {
      console.log("hello")
      if(isAdmin()) {
        return (<Button size="sm" variant="outline-danger">Demote</Button>);
      } else {
        return (<Button size="sm" variant="outline-success">Make Admin</Button>);
      }
  }

  return (
    <div className={show ? 'hidden' : ''}>
      <p className="member-name">{props.member_username}</p>
      <div className="member-buttons">
        <RelevantButton />
      </div>
    </div>
  );
}
