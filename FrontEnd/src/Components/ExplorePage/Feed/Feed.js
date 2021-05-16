import React from "react";
import Event from "./Event.js";
import "./Feed.css";
import { SegmentedControl } from 'segmented-control'
import { getCurrentUser } from "../../../Common/Services/AuthService.js";
import { getDBUser } from "../../../Common/Services/UserService.js";
import moment from "moment";

class Feed extends React.Component {
  constructor(props){
    super(props)
    this.state = {events:[], dbUser: {}}
    const currentUser = getCurrentUser();
    getDBUser(currentUser.get("username"), currentUser.get("email")).then((user) => this.setState({dbUser: user}))
  }

  getEvents(route) {
    fetch(route, {
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
        console.log(route)
        this.setState({events: data})
    })
  }

  render() {
    return (
      <div>
        <div className="header">
          <h2 className="feed-header">{"Events Around Campus"}{" "}</h2>
          <SegmentedControl
              name="twoOptions"
              options={[
              { label: "All Events", value: "/event", default: true },
              { label: "Your Club's Events", value: "/event/clubevents/" + this.state.dbUser.user_id}
              ]}
              setValue={route => this.getEvents(route)}
              style={{ width: 400, height: 50, color: '#057BFE' }} // Min hight is 50
          />
        </div>
        <div className="feed">
          <div className="event-info-container">
            {this.state.events.map((event) => (
              <Event
                key={event.event_id}
                description={event.event_description}
                club_id={event.club_id}
                event_img={event.event_img}
                event_start={moment(event.start_time).format("lll")} // https://medium.com/how-to-react/format-your-date-or-time-in-react-js-using-moment-js-89c5c6e4f174
                event_end={moment(event.end_time).format("LT")}
                club_name={event.club_name}
                event_id={event.event_id}
                title={event.title}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed