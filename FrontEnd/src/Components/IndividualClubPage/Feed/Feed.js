import React from "react";
import { useEffect, useState } from "react";
import Event from "./Event.js";
import "./Feed.css";

export default function Feed(props) {
    let clubId = props.clubId; // Get the URL Parameter
    const [club, setClub] = useState([]);
    useEffect(() => {
      fetch('/club/event/' + clubId, {
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
          setClub(data)
      })
    }, [clubId]);

  return (
    <div className="feed">
      <div>
        <h2 className="feed-header">
          {"This Club's Events"}{" "}
        </h2>
      </div>
      <div className="event-info-container">
        {club.map((club) => (
          <Event
            key={club.event_id}
            description={club.event_description}
            club={club.club_id}
            event_img={club.event_img}
            event_start={club.start_time}
            club_name={club.club_name}
            event_id={club.event_id}
          />
        ))}
      </div>
    </div>
  );
}
