import React from "react";
import { Button } from "react-bootstrap";
import "./SubscriptionTile.css"

export default function SubscriptionTile(props) {
  // const date = new Date(props.event_start);
  const rankText = (rank) => {
    if (rank === "0")
      return "member"
    if (rank === "1")
      return "leader"
  }
  return (
    <div className="subscription-tile">
      <span className="club-name"><p>{props.club_name}</p><p className="rank-text"><em>{rankText(props.rank)}</em></p></span>
      <div className="buttons">
      {props.rank === "1" && <Button className="delete-club" onClick={props.deleteClub} variant="warning">Delete Club</Button>}
      <Button className="leave-club" onClick={props.eventHandler} variant="secondary">Leave Club</Button>
      </div>
    </div>
  );
}
