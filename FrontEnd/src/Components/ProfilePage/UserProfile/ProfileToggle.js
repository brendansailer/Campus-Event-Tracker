import React from "react";
import {ButtonGroup, Button} from "react-bootstrap"
import "./ProfileToggle.css"

// This bootstrap toggle group button component lets users choose an option for content to view on their profile
// TODO: extend functionality to more profile settings for the user
export default function ProfileToggle(props) {
  return (
    <div className="profile-toggle">
      <ButtonGroup className="toggle-group" aria-label="Basic example">
        <Button variant="secondary" defaultChecked onClick={props.clickHandler("clubs")}>Your Clubs</Button>
        <Button variant="secondary" onClick={props.clickHandler("createClub")}>Create A Club</Button>
      </ButtonGroup>
    </div>
  );
}