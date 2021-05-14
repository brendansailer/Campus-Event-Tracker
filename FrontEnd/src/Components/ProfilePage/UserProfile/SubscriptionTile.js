import React from "react";
import { Button } from "react-bootstrap";
import "./SubscriptionTile.css"

export default function SubscriptionTile(props) {
  // const date = new Date(props.event_start);
  return (
    <div className="subscription-tile">
      <span className="club-name"><p>{props.club_name}</p><p>{props.rank}</p></span>
      <div className="buttons">
      {props.rank === "1" && <Button className="delete-club" onClick={props.deleteClub} variant="warning">Delete Club</Button>}
      <Button className="leave-club" onClick={props.eventHandler} variant="secondary">Leave Club</Button>
      </div>
    </div>
  );
}
