import React from "react";
import { useEffect, useState } from "react";
import Message from "./Message.js";
import "./Announcements.css";
import moment from "moment";

export default function Announcements(props) {
    let clubId = props.clubId; // Get the URL Parameter
    const [messages, setMesssages] = useState([]);
    useEffect(() => {
      fetch('/club/announcement/' + clubId, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      }).then(response => response.json()).then(data => {
          console.log(data)
          setMesssages(data)
      })
    }, [clubId]);

  return (
    <div className="announcements">
      <div>
        <h2 className="announcements-header">
          {"Announcements"}{" "}
        </h2>
      </div>
      {messages.length !== 0 ? // If there are announcements, render them.  Otherwise, display no announcements
        <div className="event-info-container">
          {messages.map((message) => (
            <Message
              key={message.announcement_id}
              event_start={moment(message.created_at).format("MMMM Do")} // Add "LT" at the end to get the time
              event_end={moment(message.expires_at).format("MMMM Do")}
              description={message.announcement_text}
              id={message.announcement_id}
            />
          ))}
        </div>
        : <div>
            <p className="announcement-text">No Announcements</p>
            <p className="announcement-text-small">Check Back Later</p> 
          </div>
      }
    </div>
  );
}
