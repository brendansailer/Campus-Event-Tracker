import React from "react";
import { useEffect, useState } from "react";
import EventsCalendar from "./EventsCalendar"
// import { getCurrentUser } from "../../../Common/Services/AuthService";

export default function CalendarWindow() {
  const [events, setEvents] = useState([]);
  // var currentUser = getCurrentUser();
  useEffect(() => {
    fetch('/event', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(response => response.json()).then(data => {
        console.log(data)
        setEvents(data)
    })
  }, []);

  // const refreshFeed = () => {
  //   listUserEvents().then((userEvents) => {
  //     setEvents(userEvents.reverse());
  //   });
  // };

  return (
    <div className="feed">
      <div>
        <h2 className="feed-header">Upcoming Events</h2>
      </div>
      {/* <NewEvent refreshFeed={refreshFeed} /> */}
      <div className="event-info-container">
        <EventsCalendar events={events} />
      </div>
    </div>
  );
}