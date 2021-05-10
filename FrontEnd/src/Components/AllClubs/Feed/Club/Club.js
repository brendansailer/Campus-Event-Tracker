import React from "react";
import "./Club.css";
import { Link } from "react-router-dom";

function MemberHtml(props) {
  if(props.member === 1) {
    return <p>Susbscribed</p>
  } else {
    return <p>Not Subscribed</p>
  }
}//<MemberHtml member={props.member}/>

export default function Club(props) {
  return (
    <div className="club">
      <Link className="club-name" to={"/club/" + props.club_id}> {props.name} </Link>
      
      <p className="club-text">{props.description}</p>
    </div>
  );
}
