import React from "react";
//import "./Announcement.css";
//import { Link } from "react-router-dom";
import "./Member.css";
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { makeAdmin, demoteAdmin } from "../../../Common/Services/MembershipService"

export default function Member(props) {
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(String(props.member_rank) === "1");
  }, [props.member_rank])

  useEffect(() => {
    if(props.dbUser === props.member_id) {
        setShow(true);
    } else {
        setShow(false);
    }
  }, [props.dbUser, props.member_id])

  function makeAdminHandler(e) {
    setAdmin(true);
    e.preventDefault();
    console.log(makeAdmin(props.member_id,props.club_id));
  }

  function demoteAdminHandler(e) {
    setAdmin(false);
    e.preventDefault();
    console.log(demoteAdmin(props.member_id,props.club_id));
  }

  function RelevantButton(props) {
    if(props.admin) {
      return (<Button size="sm" variant="outline-danger" onClick={demoteAdminHandler}>Demote</Button>);
    } else {
      return (<Button size="sm" variant="outline-success" onClick={makeAdminHandler}>Make Admin</Button>);
    }
  }

  return (
    <div className={show ? 'hidden' : ''}>
      <p className="member-name">{props.member_username}</p>
      <div className="member-buttons">
        <RelevantButton
          admin={admin}
        />
      </div>
    </div>
  );
}