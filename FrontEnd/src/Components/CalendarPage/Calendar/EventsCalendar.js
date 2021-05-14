import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Redirect } from "react-router-dom";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EventsCalendar.css"

moment.locale();
const localizer = momentLocalizer(moment);

function redirect_to_event(event){
    console.log(event.id)
    window.location = "/event/" + event.id;
    return (<Redirect to={"/event/" + event.id} />)
}

export default function EventsCalendar(props) {
    const transformedEvents = props.events.map(e => {
        return {id: e.event_id, start: moment(e.start_time).toDate(), end: moment(e.end_time).toDate(), title: e.event_description}
    })
    console.log(transformedEvents)
    return (
        <div className="events-calendar">
            <Calendar
                localizer={localizer}
                events={transformedEvents}
                style={{ height: 600 }}
                onSelectEvent={event => redirect_to_event(event)}
            />
        </div>
    )
  }